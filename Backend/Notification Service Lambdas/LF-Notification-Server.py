import json
import boto3
import mysql.connector
import json
import requests
import json
import itertools
import random

queue_url = "https://sqs.us-east-1.amazonaws.com/325665351746/NotificationQueue.fifo"

def sendmsgtosqs(subject,status,emails):
    # Sending the data to sqs queue
    sqs = boto3.client('sqs')
    response = sqs.send_message(
        QueueUrl=queue_url,
        MessageGroupId="notification_group",
        MessageDeduplicationId="notification_dedupli" + str(random.randint(10, 1000)),
        MessageAttributes = {
            'Status': {
                'DataType': 'String',
                'StringValue': str(status)
            },
            'Emails': {
                'DataType': 'String',
                'StringValue': str(emails)
            },
            'SubjectInfo': {
                'DataType': 'String',
                'StringValue': str(subject)
            }
        },
        MessageBody= 'The current status of the following subject has changed'
    )

def lambda_handler(event, context):
    mydb = mysql.connector.connect(
      host="database-1.chuhb1mmlr5o.us-east-1.rds.amazonaws.com",
      user="admin",
      password="Test1234"
    )
    
    # A fetch unique combination of sem, school, program
    schoolsToCheck = []
    sql1="SELECT year,semester,school,program FROM course_helper.wishlist group by year,semester,school,program;"
    mycursor = mydb.cursor()
    mycursor.execute(sql1)
    result = mycursor.fetchall()
    for tuple in result:
         schoolsToCheck.append(tuple)

    # B fetch Unique courseID, section, prevStatus from Wishlist table for each combination in A
    # create one object for every A + B combination, use a Map to fast query
    subjectsToCheck = {}
    for combination in schoolsToCheck:
        sql2='SELECT courseid, section, lastStatus FROM course_helper.wishlist WHERE year = {0} AND semester = "{1}" AND school="{2}" AND program = "{3}" group by courseid, section, lastStatus;'.format(combination[0],combination[1],combination[2],combination[3])
        mycursor = mydb.cursor()
        mycursor.execute(sql2)
        result = mycursor.fetchall()
        for section in result:
             key = '-'.join(map(str,combination)) + '-' + str(section[0]) + '-' + section[1]
             val = {
                 "year":combination[0],
                 "semester": combination[1],
                 "school":combination[2],
                 "program":combination[3],
                 "courseID":section[0],
                 "section":section[1],
                 "lastStatus":section[2]
             }
             subjectsToCheck[key] = val
    
    print(subjectsToCheck)
    
    
    # C for each combination in A call Schedge to get current status of all courses and sections
    # check current status vs prev status of every key in B Map
    # if status is changed, add B to CourseOpened or CourseClosed notification
    courseOpenedSet = []
    courseClosedSet = []
    for combination in schoolsToCheck:
        # subjects = requests.get('https://schedge.a1liu.com/{0}/{1}/{2}/{3}'.format(combination[0],'fa','GY','CS'))
        subjects = requests.get('https://schedge.a1liu.com/{0}/{1}/{2}/{3}'.format(combination[0],combination[1],combination[2],combination[3]))
        subjects = json.loads(subjects.text)
        for subject in subjects:
            courseid = subject['subjectCode']['code'] + '-' + subject['subjectCode']['school'] + "-" + subject['deptCourseId']
            courseidOriginal = courseid
            key_prefix = '-'.join(map(str,combination)) + '-' + courseid + '-'
            for section in subject['sections']:
                if courseid == 'CS-GY-9223':
                    sectionName = section['name']
                    sectionId = ""
                    for word in sectionName.split(" "):
                        sectionId = sectionId + word[0]
                    courseid = courseid + sectionId
                    key_prefix = '-'.join(map(str,combination)) + '-' + courseid + '-'
                key = key_prefix  + section['code']
                if key in subjectsToCheck:
                    print('Checking ' + key)
                    if subjectsToCheck[key]['lastStatus'] != section['status']:
                        if courseidOriginal == 'CS-GY-9223':
                            subjectsToCheck[key]['name'] = section['name']
                        else:
                            subjectsToCheck[key]['name'] = subject['name']
                        subjectsToCheck[key]['displayID'] = courseidOriginal
                        subjectsToCheck[key]['status'] = section['status']
                        if subjectsToCheck[key]['lastStatus'] == 'Open':
                            courseClosedSet.append(subjectsToCheck[key])
                        else:
                            courseOpenedSet.append(subjectsToCheck[key])
    
    # D For each section in CourseClosed or CourseOpened, fetch Users from DB and send SQS message
    for section in itertools.chain(courseOpenedSet, courseClosedSet):
        sql1='SELECT distinct(u.email) FROM course_helper.wishlist w INNER JOIN course_helper.users u on w.userid = u.username '\
        'where w.year = {0} AND w.semester = "{1}" AND w.school="{2}" AND w.program = "{3}"  AND w.section = "{4}" '\
        'AND w.courseid = "{5}"'.format(section["year"],section["semester"],section["school"],section["program"],section["section"],section["courseID"])
        mycursor = mydb.cursor()
        mycursor.execute(sql1)
        result = mycursor.fetchall()
        emails = ''
        for tuple in result:
             emails += tuple[0] + ","
        emails = emails[:-1]
        # E for each entry in D, send message to SQS 
        sendmsgtosqs(section['displayID'] + " " + section['name'],section['status'],emails)
        # F update status in DB for the given section
        sql='UPDATE course_helper.wishlist SET lastStatus = "{0}" '\
        'where year = {1} AND semester = "{2}" AND school="{3}" AND program = "{4}"  AND section = "{5}" '\
        'AND courseid = "{6}"'.format(section['status'],section["year"],section["semester"],section["school"],section["program"],section["section"],section["courseID"])
        mycursor = mydb.cursor()
        mycursor.execute(sql)
    
    mydb.commit()
    
    return {
        'statusCode': 200,
        'body': 'Notifications added to queue succesfully'
    }

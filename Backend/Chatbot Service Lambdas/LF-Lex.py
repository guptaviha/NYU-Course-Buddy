
import math
import dateutil.parser
import datetime
import time
import os
import logging
import boto3
import json
import re
import requests
import mysql.connector
import random
from datetime import date

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)
SQS = boto3.client("sqs")


""" --- Helpers to build responses which match the structure of the necessary dialog actions --- """


def get_slots(intent_request):
    return intent_request['currentIntent']['slots']


def elicit_slot(session_attributes, intent_name, slots, slot_to_elicit, message):
    return {
        'sessionAttributes': session_attributes,
        'dialogAction': {
            'type': 'ElicitSlot',
            'intentName': intent_name,
            'slots': slots,
            'slotToElicit': slot_to_elicit,
            'message': message
        }
    }


def close(session_attributes, fulfillment_state, message):
    response = {
        'sessionAttributes': session_attributes,
        'dialogAction': {
            'type': 'Close',
            'fulfillmentState': fulfillment_state,
            'message': message
        }
    }

    return response


def delegate(session_attributes, slots):
    return {
        'sessionAttributes': session_attributes,
        'dialogAction': {
            'type': 'Delegate',
            'slots': slots
        }
    }


""" --- Helper Functions --- """

def parse_int(n):
    try:
        return int(n)
    except ValueError:
        return float('nan')

def default_json(t):
    return f'{t}'

""" --- Functions that control the bot's behavior --- """


def courseSuggestions(intent_request,context,mydb):
    
    semester = intent_request['currentIntent']['slots']['Semester']
    sem = semester[:2]
    year = intent_request['currentIntent']['slots']['Year']
    currentdate = date.today()
    if int(year) < currentdate.year:
        return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'Sorry, the year and semester you requested are in the past.'})
    schoolname = intent_request['currentIntent']['slots']['School']
    programname = intent_request['currentIntent']['slots']['Program']
    graduate = intent_request['currentIntent']['slots']['Graduate']
    #source = intent_request['invocationSource']
    if graduate.lower() == 'graduate' or graduate.lower().startswith('grad'):
        schoolql='SELECT code FROM course_helper.school where lower(Replace(coalesce(name,""), " ","")) like "%{0}%" and code like "%G%";'.format(schoolname)
    elif graduate.lower() == 'undergraduate' or graduate.lower().startswith('under'):
        schoolql='SELECT code FROM course_helper.school where lower(Replace(coalesce(name,""), " ","")) like "%{0}%" and code like "%U%";'.format(schoolname)
    else:
        schoolql='SELECT code FROM course_helper.school where lower(Replace(coalesce(name,""), " ","")) like "%{0}%";'.format(schoolname)
    mycursor = mydb.cursor()
    mycursor.execute(schoolql)
    school = mycursor.fetchall()
    if not school:
        return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'Sorry we could not find your school. Please try again<br>'})
    schup = "".join(school[0])
    #sql1 = 'SELECT id, name, school, program FROM course_helper.courses'
    
    progcodesql = 'select code from course_helper.subject where code = "{0}" and school = "{1}";'.format(programname,schup)
    mycursor = mydb.cursor()
    mycursor.execute(progcodesql)
    program = mycursor.fetchall()
    print(program)
    if not program:
        programsql = 'select code from course_helper.subject where lower(Replace(coalesce(name,""), " ","")) like "%{0}%" and school = "{1}";'.format(programname,schup)
        mycursor.execute(programsql)
        program = mycursor.fetchall()
        print(program)
        if not program:
            return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'Sorry we could not find your requested program. Please try again<br>'})
    programcode = "".join(program[0])
    courseOpenedSet = []
    print(programcode)
    # subjects = requests.get('https://schedge.a1liu.com/{0}/{1}/{2}/{3}'.format(combination[0],'fa','GY','CS'))
    subjects = requests.get('https://schedge.a1liu.com/{0}/{1}/{2}/{3}'.format(year,sem,schup,programcode))
    subjects = json.loads(subjects.text)
    #print(subjects)
    for subject in subjects:
        courseid = subject['subjectCode']['code'] + '-' + subject['subjectCode']['school'] + "-" + subject['deptCourseId']
        for section in subject['sections']:
            if section['status'] == 'Open':
                section['courseid'] = courseid
                courseOpenedSet.append(section)
                            
    #print(courseOpenedSet)
    if not courseOpenedSet:
        return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'Sorry, no courses are currently open for your requested semester. Please try again'})
    courses = []
    formatted_courses = ""
    for tuple in courseOpenedSet:
        course = {}
        if tuple['courseid'].lower().endswith('x'):
            continue
        course['id'] = tuple['courseid']
        course['CourseName'] = tuple['name']
        course['Section'] = tuple['code'] 
        joined_string = ",".join(tuple['instructors'])
        course['Professor'] = joined_string
        course['Location'] = tuple['location']
        #course['InstructionMode'] = tuple['instructionMode']

        courses.append(course)
    print(courses)
    randcourses = random.sample(courses, 10)
    for course in randcourses:
        formatted_courses = formatted_courses + '<br>Course ID: ' + course['id'] + '<br>Course Name: ' + course['CourseName'] + '<br>Professor: ' + course['Professor'] + '<br>Section: ' + course['Section'] + '<br>Location: ' + course['Location'] + '<br>'
         
    

    return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'Here are the available courses for you this semester:<br>' + formatted_courses})

def ReviewRequest(intent_request,context,mydb):
    
    schoolname = intent_request['currentIntent']['slots']['School']
    graduate = intent_request['currentIntent']['slots']['Graduate']
    programname = intent_request['currentIntent']['slots']['Program']
    coursename = intent_request['currentIntent']['slots']['Coursename']
    
    if graduate.lower() == 'graduate' or graduate.lower().startswith('grad'):
        schoolql='SELECT code FROM course_helper.school where lower(Replace(coalesce(name,""), " ","")) like "%{0}%" and code like "%G%";'.format(schoolname)
    elif graduate.lower() == 'undergraduate' or graduate.lower().startswith('under'):
        schoolql='SELECT code FROM course_helper.school where lower(Replace(coalesce(name,""), " ","")) like "%{0}%" and code like "%U%";'.format(schoolname)
    else:
        schoolql='SELECT code FROM course_helper.school where lower(Replace(coalesce(name,""), " ","")) like "%{0}%";'.format(schoolname)
        
    #sql1 = 'SELECT id, name, school, program FROM course_helper.courses'
    mycursor = mydb.cursor()
    mycursor.execute(schoolql)
    school = mycursor.fetchall()
    if not school:
        return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'Sorry we could not find your school. Please try again<br>'})
    schoolcode = "".join(school[0])
    print(schoolcode)
    
    progcodesql = 'select code from course_helper.subject where code = "{0}" and school = "{1}";'.format(programname,schoolcode)
    mycursor = mydb.cursor()
    mycursor.execute(progcodesql)
    program = mycursor.fetchall()
    if not program:
        programsql = 'select code from course_helper.subject where lower(Replace(coalesce(name,""), " ","")) like "%{0}%" and school = "{1}";'.format(programname,schoolcode)
        mycursor.execute(programsql)
        program = mycursor.fetchall()
        if not program:
            return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'Sorry we could not find your requested program. Please try again<br>'})
    programcode = "".join(program[0])
    #source = intent_request['invocationSource']
    #sql2='SELECT course, quality, professor, reviewtext, grade FROM course_helper.reviews where lower(Replace(coalesce(course,''), ' ','')) like "%{0}%" LIMIT 3;'.format(coursename)
    reviewql = 'select rws.course, crs.name, rws.professor, rws.quality, rws.reviewtext, rws.grade from course_helper.reviews as rws left join course_helper.courses as crs on rws.course=crs.id  where crs.school = "{0}" and crs.program = "{1}" and lower(Replace(coalesce(crs.name,""), " ","")) like "%{2}%" LIMIT 3;'.format(schoolcode,programcode,coursename)
    mycursor = mydb.cursor()
    mycursor.execute(reviewql)
    myresult = mycursor.fetchall()
    print(myresult)
    
    if not myresult:
        return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'Sorry, we did not find any reviews for this course. Please try again.'})
    reviews = []
    for tuple in myresult:
        review = {}
        review['Course'] = tuple[0]
        review['CourseName'] = tuple[1]
        review['Professor'] = tuple[2]
        review['Quality'] = tuple[3] 
        review['ReviewText'] = tuple[4]
        review['Grade'] = tuple[5]

        reviews.append(review)
    reviewcount = len(reviews)   
    formatted_reviews = ""
    for r in reviews:
        formatted_reviews = formatted_reviews + '<br>Course ID: ' + r['Course'] + '<br>Course Name: ' +r['CourseName'] + '<br>Professor: ' + r['Professor'] + '<br>Quality: ' + str(r['Quality']) + '<br>Review Description: ' + r['ReviewText'] + '<br>Grade: ' + str(r['Grade']) + '<br>'
            

    return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'Here are the recent ' + str(reviewcount) + ' reviews for this course:<br>' + formatted_reviews})
                  
                  
def TopTrendingCourses(intent_request,context,mydb):
    
    schoolname = intent_request['currentIntent']['slots']['School']
    graduate = intent_request['currentIntent']['slots']['Graduate']
    programname = intent_request['currentIntent']['slots']['Program']
    semester = intent_request['currentIntent']['slots']['Semester']
    sem = semester[:2]
    year = intent_request['currentIntent']['slots']['Year']
    currentdate = date.today()
    if int(year) < currentdate.year:
        return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'Sorry, the year and semester you requested are in the past.'})
    if graduate.lower() == 'graduate' or graduate.lower().startswith('grad'):
        schoolql='SELECT code FROM course_helper.school where lower(Replace(coalesce(name,""), " ","")) like "%{0}%" and code like "%G%";'.format(schoolname)
    elif graduate.lower() == 'undergraduate' or graduate.lower().startswith('under'):
        schoolql='SELECT code FROM course_helper.school where lower(Replace(coalesce(name,""), " ","")) like "%{0}%" and code like "%U%";'.format(schoolname)
    else:
        schoolql='SELECT code FROM course_helper.school where lower(Replace(coalesce(name,""), " ","")) like "%{0}%";'.format(schoolname)
    #sql1 = 'SELECT id, name, school, program FROM course_helper.courses'
    mycursor = mydb.cursor()
    mycursor.execute(schoolql)
    school = mycursor.fetchall()
    if not school:
        return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'Sorry we could not find your school. Please try again<br>'})
    schoolcode = "".join(school[0])
    
    progcodesql = 'select code from course_helper.subject where code = "{0}" and school = "{1}";'.format(programname,schoolcode) 
    mycursor = mydb.cursor()
    mycursor.execute(progcodesql)
    program = mycursor.fetchall()
    if not program:
        programsql = 'select code from course_helper.subject where lower(Replace(coalesce(name,""), " ","")) like "%{0}%" and school = "{1}";'.format(programname,schoolcode)
        mycursor = mydb.cursor()
        mycursor.execute(programsql)
        return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'Sorry we could not find your requested program. Please try again<br>'})
    programcode = "".join(program[0])
    
    sql_to_wishlist_table='SELECT courseid, name, COUNT(*) as count FROM course_helper.wishlist WHERE program="{0}" AND school="{1}" AND semester = "{2}"'\
    ' AND year = {3} GROUP BY courseid ORDER BY count DESC LIMIT 10;'.format(programcode,schoolcode, sem, year)
    mycursor = mydb.cursor()
    mycursor.execute(sql_to_wishlist_table)
    myresult = mycursor.fetchall()
    print(myresult)
    if not myresult:
        return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'Sorry we could not find trending courses for your request.Please try again<br>'})
    topwishlisted=[]
    for tuple in myresult:
        item = {}
        item["courseid"]=tuple[0]
        item["name"]=tuple[1]
        item["count"]=tuple[2]
        topwishlisted.append(item)
    wishcount = len(topwishlisted)
    formatted_wishlist = ""
    for w in topwishlisted:
        formatted_wishlist = formatted_wishlist + '<br>Course ID: ' + w['courseid'] + '<br>Course Name: ' + w['name'] + '<br>'
            

    return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'Here are the top ' + str(wishcount) + ' wishlisted courses:<br>' + formatted_wishlist})


""" --- Intents --- """

def welcome(intent_request):
    return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'Hey there, How may I help you?'})

def thankYou(intent_request):
    return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'My pleasure, Have a great day!!'})


def dispatch(intent_request,context,mydb):
    """
    Called when the user specifies an intent for this bot.
    """
    
    logger.debug('dispatch userId={}, intentName={}'.format(intent_request['userId'], intent_request['currentIntent']['name']))

    intent_name = intent_request['currentIntent']['name']

    # Dispatch to your bot's intent handlers
    if intent_name == 'StudentRequestIntent':
        return courseSuggestions(intent_request,context,mydb)
    elif intent_name == 'ReviewRequestIntent':
        return ReviewRequest(intent_request,context,mydb)
    elif intent_name == 'TopTrendingCourseIntent':
        return TopTrendingCourses(intent_request,context,mydb)
    elif intent_name == 'ThankYouIntent':
        return thankYou(intent_request)
    elif intent_name == 'GreetingIntent':
        return welcome(intent_request)

    raise Exception('Intent with name ' + intent_name + ' not supported')


""" --- Main handler --- """


def lambda_handler(event, context):
    """
    Route the incoming request based on intent.
    The JSON body of the request is provided in the event slot.
    """
    # By default, treat the user request as coming from the America/New_York time zone.
    os.environ['TZ'] = 'America/New_York'
    time.tzset()
    mydb = mysql.connector.connect(
      host="database-1.chuhb1mmlr5o.us-east-1.rds.amazonaws.com",
      user="admin",
      password="Test1234"
    )
    logger.debug('event.bot.name={}'.format(event['bot']['name']))

    return dispatch(event,context,mydb)

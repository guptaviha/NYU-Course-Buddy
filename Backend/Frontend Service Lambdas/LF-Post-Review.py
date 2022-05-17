import json
from datetime import datetime
import mysql.connector
def lambda_handler(event, context):
    data=json.loads(event["body"])
    
    userid = event["requestContext"]["authorizer"]["claims"]["cognito:username"]
    courseid = event["queryStringParameters"]['courseID']
    quality = data["quality"]
    reviewtext = data["reviewtext"]
    professor = data["professor"]
    createdTimestamp = str(datetime.now())
    updatedTimestamp = str(datetime.now())
    grade = data["grade"]
    mandatoryAttendance = data["attendenace"]
    
    

    mydb = mysql.connector.connect(
      host="database-1.chuhb1mmlr5o.us-east-1.rds.amazonaws.com",
      user="admin",
      password="Test1234"
    )
    mycursor = mydb.cursor()
    sql = 'INSERT INTO course_helper.reviews (course,user,quality,reviewtext,professor,createdTimestamp,updatedTimestamp,grade,mandatoryAttendance) VALUES ("{0}","{1}","{2}","{3}","{4}","{5}","{6}","{7}","{8}");'.format(courseid,userid,quality,reviewtext,professor,createdTimestamp,updatedTimestamp,grade,mandatoryAttendance) 
    mycursor.execute(sql)
    
    sql1='SELECT recentprofessors FROM course_helper.courses WHERE id = "{0}";'.format(courseid)
    mycursor.execute(sql1)
    result = mycursor.fetchall()
    recentprofessors = ''
    for tuple in result:
        recentprofessors = tuple[0]
    
    recentprofessors = set([x.strip() for x in recentprofessors.split(',')])
    if professor not in recentprofessors:
        recentprofessors.add(professor)
    recentprofessors = ', '.join(recentprofessors)
    
    sql2 = 'Update course_helper.courses SET recentprofessors = "{0}" WHERE id = "{1}"'.format(recentprofessors,courseid)
    mycursor.execute(sql2)
    
    mydb.commit()
    mycursor.close()
    mydb.close()
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps('Review added successfully.')
    }

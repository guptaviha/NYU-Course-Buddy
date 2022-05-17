import json
import boto3
import mysql.connector

def lambda_handler(event, context):
    courseID = event["queryStringParameters"]['courseID']
    mydb = mysql.connector.connect(
      host="database-1.chuhb1mmlr5o.us-east-1.rds.amazonaws.com",
      user="admin",
      password="Test1234"
    )
    sql1='SELECT id, name, school, program, credits, recentprofessors,description  FROM course_helper.courses where id = "{0}";'.format(courseID)
    mycursor = mydb.cursor()
    mycursor.execute(sql1)
    myresult = mycursor.fetchall()
    course = {}
    for tuple in myresult:
        course['id'] = tuple[0]
        course['name'] = tuple[1] 
        course['school'] = tuple[2]
        course['program'] = tuple[3]
        course['credits'] = str(tuple[4])
        course['recentprofessors'] = tuple[5]
        course['description'] = str(tuple[6])
        
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(course)
    }

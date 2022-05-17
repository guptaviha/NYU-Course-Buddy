import json
import boto3
import mysql.connector
import json

def lambda_handler(event, context):
    print(event)
    school = event["queryStringParameters"]['school']

    mydb = mysql.connector.connect(
      host="database-1.chuhb1mmlr5o.us-east-1.rds.amazonaws.com",
      user="admin",
      password="Test1234"
    )
    programs = {}
    sql1='SELECT code,name FROM course_helper.subject WHERE school = "{0}";'.format(school)
    mycursor = mydb.cursor()
    mycursor.execute(sql1)
    result = mycursor.fetchall()
    for tuple in result:
         programs[tuple[0]] = tuple[1]
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(programs)
    }

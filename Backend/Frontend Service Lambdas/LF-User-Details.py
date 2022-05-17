import json
import boto3
import mysql.connector
import json

def lambda_handler(event, context):
    userid=event["requestContext"]["authorizer"]["claims"]["cognito:username"]
    mydb = mysql.connector.connect(
      host="database-1.chuhb1mmlr5o.us-east-1.rds.amazonaws.com",
      user="admin",
      password="Test1234"
    )
    sql1='SELECT username, studentname,email,program,school,semester, year FROM course_helper.users WHERE username = "{0}";'.format(userid)
    mycursor = mydb.cursor()
    mycursor.execute(sql1)
    result = mycursor.fetchall()
    user = {}
    for tuple in result:
        user['username'] = tuple[0]
        user['studentname'] = tuple[1]
        user['email'] = tuple[2]
        user['program'] = tuple[3]
        user['school'] = tuple[4]
        user['semester'] = tuple[5]
        user['year'] = tuple[6]
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(user)
    }

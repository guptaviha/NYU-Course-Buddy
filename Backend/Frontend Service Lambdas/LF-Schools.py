import json
import boto3
import mysql.connector
import json

def lambda_handler(event, context):
    print(event)

    mydb = mysql.connector.connect(
      host="database-1.chuhb1mmlr5o.us-east-1.rds.amazonaws.com",
      user="admin",
      password="Test1234"
    )
    schools = {}
    sql1="SELECT * FROM course_helper.school;"
    mycursor = mydb.cursor()
    mycursor.execute(sql1)
    result = mycursor.fetchall()
    for tuple in result:
         schools[tuple[0]] = tuple[1]
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(schools)
    }

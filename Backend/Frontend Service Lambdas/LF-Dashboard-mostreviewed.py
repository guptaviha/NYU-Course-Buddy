import json
import boto3
import mysql.connector
import json
from datetime import date

def lambda_handler(event, context):
    userid=event["requestContext"]["authorizer"]["claims"]["cognito:username"]
    mydb = mysql.connector.connect(
      host="database-1.chuhb1mmlr5o.us-east-1.rds.amazonaws.com",
      user="admin",
      password="Test1234"
    )
    mycursor = mydb.cursor()
    sql1='SELECT program,school FROM course_helper.users WHERE username = "{0}";'.format(userid)
    mycursor.execute(sql1)
    result = mycursor.fetchall()
    school = ''
    program = ''
    year = date.today().year
    for tuple in result:
         program = tuple[0]
         school = tuple[1]

    sql='SELECT c.id,c.name, count(*) as count FROM course_helper.courses as c INNER JOIN course_helper.reviews as r  ON r.course=c.id'\
    ' WHERE r.createdTimestamp >= DATE_ADD(CURDATE(), INTERVAL -10 DAY ) AND c.school = "{0}" AND c.program = "{1}"'\
    ' GROUP BY c.id ORDER BY count DESC LIMIT 10'.format(school,program)
    
    mycursor = mydb.cursor()
    mycursor.execute(sql)
    result = mycursor.fetchall()
    mostviewed=[]
    for tuple in result:
        item = {}
        item["id"]=tuple[0]
        item["name"]=tuple[1]
        mostviewed.append(item)
        
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(mostviewed)
    }

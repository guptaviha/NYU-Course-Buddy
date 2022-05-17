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
    mycursor = mydb.cursor()
    sql1='SELECT program,school FROM course_helper.users WHERE username = "{0}";'.format(userid)
    mycursor.execute(sql1)
    result = mycursor.fetchall()
    school = ''
    program = ''
    for tuple in result:
         program = tuple[0]
         school = tuple[1]
    
    # join courses table with reviews table and where course and program are as of user
    sql_to_whislist_table='SELECT  c.id, c.name, AVG(r.quality) as rating FROM course_helper.reviews as r INNER JOIN course_helper.courses as c'\
    ' ON r.course=c.id WHERE school="{0}" AND program="{1}" GROUP BY r.course ORDER BY rating DESC LIMIT 10;'.format(school,program)
    mycursor = mydb.cursor()
    mycursor.execute(sql_to_whislist_table)
    result2 = mycursor.fetchall()
    toprated=[]
    for tuple in result2:
        item = {}
        item["id"]=tuple[0]
        item["name"]=tuple[1]
        item["rating"]=str(tuple[2])
        toprated.append(item)
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(toprated)
    }

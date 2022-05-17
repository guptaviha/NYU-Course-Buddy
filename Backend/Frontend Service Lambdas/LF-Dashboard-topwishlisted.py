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
    sql1='SELECT program,school, semester, year FROM course_helper.users WHERE username = "{0}";'.format(userid)
    mycursor.execute(sql1)
    result = mycursor.fetchall()
    school = ''
    program = ''
    semester = ''
    year = date.today().year
    for tuple in result:
         program = tuple[0]
         school = tuple[1]
         semester = tuple[2]
         year = tuple[3]
    
    sql_to_whislist_table='SELECT courseid, name, COUNT(*) as count FROM course_helper.wishlist WHERE program="{0}" AND school="{1}" AND semester = "{2}"'\
    ' AND year = {3} GROUP BY courseid ORDER BY count DESC LIMIT 10;'.format(program,school, semester, year)
    mycursor = mydb.cursor()
    mycursor.execute(sql_to_whislist_table)
    result2 = mycursor.fetchall()
    topwishlisted=[]
    for tuple in result2:
        item = {}
        item["courseid"]=tuple[0]
        item["name"]=tuple[1]
        item["count"]=tuple[2]
        topwishlisted.append(item)
    # return a json with course id and number of people who whislisted it.
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(topwishlisted)
    }

import json
import boto3
import mysql.connector
import json

def lambda_handler(event, context):
    mydb = mysql.connector.connect(
      host="database-1.chuhb1mmlr5o.us-east-1.rds.amazonaws.com",
      user="admin",
      password="Test1234"
    )
    userid=event["requestContext"]["authorizer"]["claims"]["cognito:username"]
    sql1='SELECT name,lastStatus,year,section,school,program,semester,courseid FROM course_helper.wishlist WHERE userid = "{0}";'.format(userid)
    mycursor = mydb.cursor()
    mycursor.execute(sql1)
    result = mycursor.fetchall()
    items=[]
    for tuple in result:
        item={}
        item['name'] = tuple[0]
        item['lastStatus'] = tuple[1]
        item['year'] = tuple[2]
        item['section'] = tuple[3]
        item['school'] = tuple[4]
        item['program'] = tuple[5]
        item['semester'] = tuple[6]
        item['courseid'] = tuple[7]
        items.append(item)

    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(items)
    }

import json
from datetime import datetime
import mysql.connector
def lambda_handler(event, context):
    data=json.loads(event["body"])
    print("data", data)
    
    userid = event["requestContext"]["authorizer"]["claims"]["cognito:username"]
    courseid = data["courseid"]
    section = data["section"]
    year = data["year"]
    semester = data["semester"]
    program = data["program"]
    school = data["school"]
    timestamp = datetime.now()
    createdTimestamp = timestamp
    updatedTimestamp = timestamp
    lastStatus = data["lastStatus"]
    name = data["name"]
    
    exists="0"
    added="0"

    mydb = mysql.connector.connect(
      host="database-1.chuhb1mmlr5o.us-east-1.rds.amazonaws.com",
      user="admin",
      password="Test1234"
    )
    mycursor = mydb.cursor()
    
    # checksql = 'select courseid from course_helper.wishlist where courseid="CS-GY-6083" AND program="CS" AND school="GY" AND section="B" AND year="2022";'
    checksql = 'select courseid from course_helper.wishlist where courseid="{0}" AND program="{1}" AND school="{2}" AND section="{3}" AND year="{4}";'.format(courseid,program,school,section,year)
    mycursor.execute(checksql)
    
    # print("mycursor",mycursor)

    for x in mycursor:
        print("x", x[0])
        if (x[0] != None):
            print("exists")
            exists = "1"
            
    if (exists == "1"):
        return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps('Error. Item already exists in wistlist.')
    }
    else:
        insertsql = 'INSERT INTO course_helper.wishlist (userid,courseid,section,year,semester,program,school,createdTimestamp,updatedTimestamp,lastStatus,name) VALUES'\
        '("{0}","{1}","{2}",{3},"{4}","{5}"'\
        ',"{6}","{7}","{8}","{9}","{10}");'.format(userid,courseid,section,year,semester,program,school,createdTimestamp,updatedTimestamp,lastStatus,name) 
        
        mycursor.execute(insertsql)
        
        mycursor.execute(checksql)
        for x in mycursor:
            print("x", x)
            if (x):
                print("added")
                added = "1"
        if (added == "1"):
            mydb.commit()
            mycursor.close()
            mydb.close()
            return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps('Item successfully added to wishlist')
        }
        else:
            mydb.commit()
            mycursor.close()
            mydb.close()
            return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps('Database error! Please check lambda.')
        }
        
        
        
        

    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps('Course added to wishlist succesfully')
    }

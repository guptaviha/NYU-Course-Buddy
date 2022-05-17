import json
import boto3
import mysql.connector
import json

def lambda_handler(event, context):
    print(event)
    school = event["queryStringParameters"]['school']
    program = event["queryStringParameters"]['program']
    courseid = event["queryStringParameters"]['courseid']
    section = event["queryStringParameters"]['section']    
    year= event["queryStringParameters"]['year']
    
    mydb = mysql.connector.connect(
      host="database-1.chuhb1mmlr5o.us-east-1.rds.amazonaws.com",
      user="admin",
      password="Test1234"
    )
    
    
    
    exists="0"
    deleted="1"

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
            
    if (exists == "0"):
        return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps('Error. Item is not in wistlist.')
    }
    else:
        deletesql='DELETE FROM course_helper.wishlist WHERE courseid="{0}" AND program="{1}" AND school="{2}" AND section="{3}" AND year="{4}";'.format(courseid,program,school,section,year)
        
        mycursor.execute(deletesql)
        
        mycursor.execute(checksql)
        for x in mycursor:
            print("x", x)
            if (x):
                print("deleted")
                deleted = "0"
        if (deleted == "1"):
            mydb.commit()
            mycursor.close()
            mydb.close()
            return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps('Item successfully deleted from wishlist')
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



    # sql1='DELETE FROM course_helper.wishlist WHERE courseid="{0}" AND program="{1}" AND school="{2}" AND section="{3}" AND year="{4}";'.format(courseid,program,school,section,year)
    # mycursor = mydb.cursor()
    # mycursor.execute(sql1)
    # mydb.commit()
    # mycursor.close()
    # mydb.close()
    
    # return {
    #     'statusCode': 200,
    #     'headers': {
    #         'Access-Control-Allow-Origin': '*'
    #     },
    #     'body': json.dumps("Item successfully removed from wislist.")
    # }

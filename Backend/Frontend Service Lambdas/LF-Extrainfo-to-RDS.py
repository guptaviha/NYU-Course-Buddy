import json
import boto3
import mysql.connector

def lambda_handler(event, context):
    
    data=json.loads(event["body"])
    print(data)
    program = data["program"]
    school = data["school"]
    semester = data["semester"]
    studentname = data["studentname"]
    year = data["year"]
    userid=event["requestContext"]["authorizer"]["claims"]["cognito:username"]

    mydb = mysql.connector.connect(
      host="database-1.chuhb1mmlr5o.us-east-1.rds.amazonaws.com",
      user="admin",
      password="Test1234"
    )
    sql='UPDATE course_helper.users SET program = "{0}" , school = "{1}", semester = "{2}",'\
    'studentname = "{3}", year = {4}  WHERE username = "{5}";'.format(program,school,semester,studentname,year,userid)
    mycursor = mydb.cursor()
    mycursor.execute(sql)
    mydb.commit()
    mycursor.close()
    mydb.close()
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps('User details updated successfully!')
    }

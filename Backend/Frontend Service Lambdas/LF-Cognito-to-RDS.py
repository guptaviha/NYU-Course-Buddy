import json
import boto3
import mysql.connector

def lambda_handler(event, context):
    # TODO implement
    print(event)
    
    

    client = boto3.client('rds-data')
    
    mydb = mysql.connector.connect(
      host="database-1.chuhb1mmlr5o.us-east-1.rds.amazonaws.com",
      user="admin",
      password="Test1234"
    )
    
    sql="INSERT INTO course_helper.users (username,studentname,email,program,school,semester) VALUES ('"+event['userName']+"','NAN','"+event['request']['userAttributes']['email']+"','NAN','NAN','NAN')"
    sql1="SELECT * FROM course_helper.users"
    mycursor = mydb.cursor()
    mycursor.execute(sql)
    mydb.commit()
    
    
    mycursor.close()
    mydb.close()
    
    #print(mycursor.execute(sql1))
    
    return event

import json
import boto3
import mysql.connector

def lambda_handler(event, context):
    courseID = event["queryStringParameters"]['courseID']
    mydb = mysql.connector.connect(
      host="database-1.chuhb1mmlr5o.us-east-1.rds.amazonaws.com",
      user="admin",
      password="Test1234"
    )
    sql1='SELECT course, user, quality, reviewtext, professor, createdTimestamp, updatedTimestamp, grade, mandatoryAttendance FROM course_helper.reviews where course = "{0}";'.format(courseID)
    mycursor = mydb.cursor()
    mycursor.execute(sql1)
    myresult = mycursor.fetchall()
    reviews = []
    for tuple in myresult:
        review = {}
        review['course'] = str(tuple[0])
        review['user'] = tuple[1] 
        review['quality'] = str(tuple[2])
        review['reviewtext'] = tuple[3]
        review['professor'] = tuple[4]
        review['createdTimestamp'] = str(tuple[5])
        review['updatedTimestamp'] = str(tuple[6])
        review['grade'] = str(tuple[7])
        review['mandatoryAttendance'] = str(tuple[8])
        reviews.append(review)
        
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(reviews)
    }

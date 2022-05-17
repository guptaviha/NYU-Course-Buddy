import json
import boto3
import mysql.connector
from requests_aws4auth import AWS4Auth
import requests

esHost= 'https://search-nyu-course-helper-yb3mwtmm5tt4qfxn4ot4whblta.us-east-1.es.amazonaws.com'
region = "us-east-1"
index = "courses"

def getCourseIdsfromES(school,program):
    service = "es"
    credentials = boto3.Session().get_credentials()
    awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, region, service, session_token=credentials.token)
    url = esHost + '/' + index + '/_search'
    query = {"query": { "bool": {"must": [ { "match": { "school": school } }, { "match": { "program": program } } ] } } }
    # query = {"query": {"match": {"school": cuisine, "program": program }}}
    headers = { "Content-Type": "application/json" }
    res = requests.get(url, auth=awsauth, headers=headers, data=json.dumps(query))
    res = res.text
    res = json.loads(res)
    res = res["hits"]["hits"]
    return res

def lambda_handler(event, context):
    school = event["queryStringParameters"]['school']
    program = event["queryStringParameters"]['program']
    
    lookupIds = ''
    elastisearchResults = getCourseIdsfromES(school,program)
    print(elastisearchResults)
    for i in elastisearchResults:
        lookupIds = i['_source']['courseids']
    
    mydb = mysql.connector.connect(
      host="database-1.chuhb1mmlr5o.us-east-1.rds.amazonaws.com",
      user="admin",
      password="Test1234"
    )
    #sql1='SELECT id, name, school, program FROM course_helper.courses where school = "{0}" AND program = "{1}";'.format(school,program)
    sql1 = ''
    if lookupIds != '':
        lookupIds = lookupIds.split(',')
        sql1 = 'SELECT id, name, school, program FROM course_helper.courses where id in ('
        for id in lookupIds:
            sql1 = sql1 + '"' + id + '",'
        sql1 = sql1[:-1]
        sql1 = sql1 + ')'
    print(sql1)
    mycursor = mydb.cursor()
    mycursor.execute(sql1)
    myresult = mycursor.fetchall()
    courses = []
    for tuple in myresult:
        course = {}
        course['id'] = tuple[0]
        course['name'] = tuple[1] 
        course['school'] = tuple[2]
        course['program'] = tuple[3]

        courses.append(course)
        
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(courses)
    }

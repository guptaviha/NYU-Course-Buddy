import boto3
import json
import requests
from datetime import date

def lambda_handler(event, context):
    # read request params
    school = event["queryStringParameters"]['school']
    program = event["queryStringParameters"]['program']
    semester = event["queryStringParameters"]['semester']
    # determine which year to query, can take year as user input also
    # year = date.today().year
    year = event["queryStringParameters"]['year']
    
    subjects = requests.get('https://schedge.a1liu.com/{0}/{1}/{2}/{3}'.format(year,semester,school,program))
    
    # print(subjects.json())
    # print(json.dumps(subjects.json()))
    
    # can use code below to put Course-ID in each element
    # subjects = json.loads(subjects.text)
    # for subject in subjects:
    #     courseid = subject['subjectCode']['code'] + '-' + subject['subjectCode']['school'] + "-" + subject['deptCourseId']
    #     for section in subject['sections']:
    #             # do something
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(subjects.json())
    }

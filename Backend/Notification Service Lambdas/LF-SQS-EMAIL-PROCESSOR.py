import json
import logging
import boto3

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

region = "us-east-1"

def sendSESMail(message,emails):
    ses_client = boto3.client('ses', region_name=region)
    response = ses_client.send_email(
        Source='vg2237@nyu.edu',
        Destination={
            'ToAddresses': ['syed.ahmad@nyu.edu'],
            'BccAddresses': emails.split(',')
        },
        ReplyToAddresses=['vg2237@nyu.edu'],
        Message={
            'Subject': {
                'Data': 'NYU Course Update on Wishlist',
                'Charset': 'utf-8'
            },
            'Body': {
                'Text': {
                    'Data': message,
                    'Charset': 'utf-8'
                },
                'Html': {
                    'Data': message,
                    'Charset': 'utf-8'
                }
            }
        }
    )
    

def lambda_handler(event, context):
    numOfRecords = len(event.get('Records', []))

    if numOfRecords > 0:
        for message in event.get("Records", []):
            messageAttributes = message['messageAttributes']
            
            # read parameters from event
            emails = messageAttributes['Emails']['stringValue']
            status = messageAttributes['Status']['stringValue']
            subjectinfo = messageAttributes['SubjectInfo']['stringValue']
            
            # prepare response for user
            responseToUser = "Hello! The status of course {} has changed to {}.".format(str(subjectinfo),str(status)) 

            logger.debug('Viha responseToUser={}'.format(responseToUser))

            sendSESMail(responseToUser,emails)
            
            sqs_client = boto3.client("sqs", region_name=region)
            sqs_client.delete_message(
                QueueUrl= "https://sqs.us-east-1.amazonaws.com/325665351746/NotificationQueue.fifo",
                ReceiptHandle=message['receiptHandle']
            )
        return {
            'statusCode': 200,
            'body': json.dumps('Notification sent successfully')
        }
    else:
         return {
            'statusCode': 200,
            'body': json.dumps('No messages present in SQS queue')
        }
    
    
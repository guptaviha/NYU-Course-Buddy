#!/usr/bin/env python3
import mysql.connector
import json
import requests
import sys

mydb = mysql.connector.connect(
  host="database-1.chuhb1mmlr5o.us-east-1.rds.amazonaws.com",
  user="admin",
  password="Test1234"
)

mycursor = mydb.cursor()
sql1='SELECT school, program, GROUP_CONCAT(id) as ids FROM course_helper.courses group by school, program;'
mycursor.execute(sql1)
result  = mycursor.fetchall()
indexes = []
for tuple in result:
    item = {}
    item['school'] = tuple[0]
    item['program'] = tuple[1]
    item['ids'] = tuple[2]
    indexes.append(item)
    
with open('courseIndex.json', 'w') as f:
		for item in indexes:
			res = {}
			res["_index"] = "courses"
			res2 = {}
			res2["index"] = res
			f.write(json.dumps(res2))
			f.write('\n')
			doc = {}
			doc['school'] = item['school']
			doc['program'] = item['program']
			doc['courseids'] = item['ids']
			f.write(json.dumps(doc))
			f.write('\n')
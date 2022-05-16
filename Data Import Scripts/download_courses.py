#!/usr/bin/env python

import sys
import json
import requests

args = sys.argv[1:]
print("args", args)

if len(args) != 4:
  print("error. needs two args like: school 'GY' subject 'CS'")
  exit()

year = args[0]
semester = args[1]
school = args[2]
subject = args[3]
# response = requests.get("https://schedge.a1liu.com/2022/fa/GY/CS")
response = requests.get("https://schedge.a1liu.com/" + year + "/" + semester + "/" + school + "/" + subject )
# print(response)
# print(response.json())

with open('./data/courses_' + year + '_' + semester + '_' + school + '_' + subject + '.json', 'w') as outfile:
  json.dump(response.json(), outfile)


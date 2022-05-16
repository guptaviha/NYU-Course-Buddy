#!/usr/bin/env python

import sys
import json
import requests


def download_courses(year, semester, school, subject):
  # response = requests.get("https://schedge.a1liu.com/2022/fa/GY/CS")
  response = requests.get("https://schedge.a1liu.com/" + year + "/" + semester + "/" + school + "/" + subject)
  if response.json() == []:
    print (year, semester, school, subject, "is empty so skip")
  else:
    with open('./data/courses_' + year + '_' + semester + '_' + school + '_' + subject + '.json', 'w') as outfile:
      json.dump(response.json(), outfile)


args = sys.argv[1:]
print("args", args)

if len(args) != 2:
  print("error. needs two args like: year '2022' semester 'sp/fa/su/ja/current'")
  exit()

year = args[0]
semester = args[1]

with open('./data/test_subjects.json') as json_file:
    schools = json.load(json_file)
    # print(schools)

for school in schools:
  for subject in schools[school]:
    print(school, subject)
    download_courses(year, semester, school, subject)




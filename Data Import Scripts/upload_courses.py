#!/usr/bin/env python3

import mysql.connector
import json
import requests
import sys

args = sys.argv[1:]
print("args", args)

if len(args) != 1:
  print("error. needs one arg for filename like: courses_2022_fa_GY_BE.json")
  exit()

filename = args[0]

mydb = mysql.connector.connect(
  host="database-1.chuhb1mmlr5o.us-east-1.rds.amazonaws.com",
  user="admin",
  password="Test1234"
)

mycursor = mydb.cursor()

with open('./data/' + filename) as json_file:
    courses = json.load(json_file)

for course in courses:
  name = course['name']
  print(name)
  school = course['subjectCode']['school'] # GY
  subject = course['subjectCode']['code'] # CS
  deptid = subject + '-' + school + "-" + course['deptCourseId']
  credits = course['sections'][0]['maxUnits']
  recentProfs = ""
  year = '2022'
  semester = 'fa'
  
  try:
    response = requests.get("https://schedge.a1liu.com/" + year + "/" + semester + "/search?full=true&school=" + school + "&subject=" + subject + "&query=" + name ).json()
    desc = json.dumps(response[0]['description']).replace("'", r"\'")
  except:
    desc = ""

  if (deptid == 'CS-GY-9223'):
    for section in course['sections']:
      sectionName = section['name']
      # print(sectionName)
      sectionId = ""
      for word in sectionName.split(" "):
        sectionId = sectionId + word[0]
      sectionId = deptid + sectionId
      name = section['name']
      mycursor.execute('insert ignore into course_helper.courses values ('\
        + '"' + sectionId + '", '\
        + '"' + name + '", '\
        + '"' + school + '", '\
        + '"' + subject + '", '\
        + '"' + str(credits) + '", '\
        + '"' + recentProfs + '", '\
        + '"' + desc + '");')
  else:
    mycursor.execute("insert ignore into course_helper.courses values ("\
      + "'" + deptid + "', "\
      + "'" + name + "', "\
      + "'" + school + "', "\
      + "'" + subject + "', "\
      + "'" + str(credits) + "', "\
      + "'" + recentProfs + "', "\
      + "'" + desc + "');")

# mycursor.execute("select * from users;")
# mycursor.execute("select * from course_helper.courses;")

# for x in mycursor:
#   print(x)

mydb.commit()
mydb.close()
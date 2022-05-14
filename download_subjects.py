#!/usr/bin/env python

import json
import requests

response = requests.get("https://schedge.a1liu.com/subjects")
print(response.json())

with open('./data/subjects.json', 'w') as outfile:
  json.dump(response.json(), outfile)

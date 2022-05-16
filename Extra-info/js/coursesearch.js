//User info
var access_token = localStorage.getItem("id_token");

var params = {
  "Authorization": access_token,
  "school": "UC"
}
var body = {
  "Authorization": access_token
}

var apigClient = apigClientFactory.newClient({});

apigClient.usersUserGet(params, body, {}).then(function (res) {
  userdata = res["data"];
  document.getElementById("username").innerHTML = userdata["username"];
  document.getElementById("school").innerHTML = userdata["school"];
  document.getElementById("program").innerHTML = userdata["program"] + " Major";
  document.getElementById("semester").innerHTML = userdata["semester"];
}).catch(function (error) {
  console.log(error);
});

apigClient.schoolsGet(params, {}, {}).then(function (res) {

  var schools = Object.keys(res['data']);
  var codes = Object.values(res['data'])
  // sortLists(schools,codes)
  var select = document.createElement("select");
  select.name = "schools";
  select.id = "schoollist"
  for (const val of schools) {
    var option = document.createElement("option");
    option.value = val + " - " + res['data'][val];
    option.text = val.charAt(0).toUpperCase() + val.slice(1);
    select.appendChild(option);
  }
  var label = document.createElement("label");
  label.innerHTML = "School "
  label.htmlFor = "schools";
  document.getElementById("drp").appendChild(label).appendChild(select);
  document.getElementById('schoolz').innerHTML = document.getElementById("schoollist").value;
  params = {
    "Authorization": access_token,
    "school": document.getElementById("schoolz").innerHTML.slice(-2)
  }
}).catch(function(error) {
  console.log(error);
});

let values = {}
let values_codes = []

function funct() {

  document.getElementById('schoolz').innerHTML = document.getElementById("schoollist").value;

  params = {
    "Authorization": access_token,
    "school": document.getElementById("schoolz").innerHTML.slice(-2)
  }

  let element = document.getElementById("drppr");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  let element2 = document.getElementById("insidecouse");
  while (element2.firstChild) {
    element2.removeChild(element2.firstChild);
  }

  apigClient.schoolsProgramsGet(params, {}, {}).then(function (res) {
    values = {};
    values = res['data'];
    values_codes = Object.keys(res['data']);
    funcpr();
  }).catch(function(error) {
    console.log(error);
  });
}

function funcprogram() {
  document.getElementById('schoolz').innerHTML = document.getElementById("schoollist").value;
  document.getElementById('programz').innerHTML = document.getElementById("programlist").value;
}


function funcpr() {
  var select = document.createElement("select");
  select.name = "programs";
  select.id = "programlist"
  for (const val of values_codes) {
    var option = document.createElement("option");
    option.value = val;
    option.text = values[val].charAt(0).toUpperCase() + values[val].slice(1);
    select.appendChild(option);
  }

  var label = document.createElement("label");
  label.innerHTML = "Program: "
  label.htmlFor = "program";

  document.getElementById("drppr").appendChild(label).appendChild(select);
  document.getElementById('programz').innerHTML = document.getElementById("programlist").value;
}

apigClient.schoolsProgramsGet(params, {}, {}).then(function (res) {
  values = res['data'];
  values_codes = Object.keys(res['data'])
  funcpr();
}).catch(function(error) {
  console.log(error);
});

let coursedata = {}

function sortLists(names,codes) {
  //1) combine the arrays:
  var list = [];
  for (var j = 0; j < names.length; j++) 
      list.push({'name': names[j], 'age': codes[j]});

  //2) sort:
  list.sort(function(a, b) {
      return ((a.name < b.name) ? -1 : ((a.name == b.name) ? 0 : 1));
      //Sort could be modified to, for example, sort on the age 
      // if the name is the same.
  });

  //3) separate them back out:
  for (var k = 0; k < list.length; k++) {
      names[k] = list[k].name;
      codes[k] = list[k].age;
  }
}

function searchcourse() {

  document.getElementById("results-section").style.display="block";
  
  let element3 = document.getElementById("insidecouse");
  while (element3.firstChild) {
    element3.removeChild(element3.firstChild);
  }

  school = document.getElementById('schoolz').innerHTML.slice(-2);
  subject = document.getElementById('programz').innerHTML;
  year = document.getElementById('yr').value;
  semester = document.getElementById('sem').value;

  params = {
    "Authorization": access_token,
    "school": school,
    "program": subject,
    "year": year,
    "semester": semester
  }
  
  apigClient.searchGet(params, {}, {}).then(function (res) {
    coursedata = res['data'];

    for (const course in coursedata) {
      var li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = coursedata[course]['name'];
      var anchor = document.createElement("a");
      const courseID = `${subject}-${school}-${coursedata[course]["deptCourseId"]}`  
      const parameters = `school=${school}&subject=${subject}&year=${year}&semester=${semester}&name=${coursedata[course]["name"]}&courseid=${courseID}`;
      anchor.href = "coursedetail.html?" + parameters;
      anchor.style.textDecoration = "none";
      anchor.appendChild(li);
      document.getElementById("insidecouse").appendChild(anchor);
    }
  }).catch(function (error) {
    console.log(error);
  });
}
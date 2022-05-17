//User info
var access_token = localStorage.getItem("id_token");

var params={
  "Authorization":access_token,
  "school":"UC"
  }
var body={
  "Authorization":access_token
  }

let results = []

var apigClient = apigClientFactory.newClient({ });

apigClient.usersUserGet(params, body , {}).then(function(res){
  userdata=res["data"];
  document.getElementById("username").innerHTML=userdata["username"];
  document.getElementById("school").innerHTML=userdata["school"];
  document.getElementById("program").innerHTML=userdata["program"] + " Major";
  document.getElementById("semester").innerHTML=userdata["semester"];
}).catch(function(error){
    console.log(error);
});

apigClient.schoolsGet(params, {} , {}).then(function(res){
  var schools = Object.keys(res['data']);
  var codes = Object.values(res['data']);
  const sortedSchools = sortLists(schools,codes);

  var select = document.createElement("select");
  select.name = "schools";
  select.className="form-select";
  select.id = "schoollist"
  for (const school of sortedSchools) {
    var option = document.createElement("option");
    option.value = school.name + " - " + school.code;
    option.text = school.name;
    select.appendChild(option);
  }
  var label = document.createElement("label");
  label.innerHTML = "School "
  label.htmlFor = "schools";
  document.getElementById("drp").appendChild(label).appendChild(select);
  document.getElementById('schoolz').innerHTML = document.getElementById("schoollist").value;
  // params = {
  //   "Authorization": access_token,
  //   "school": document.getElementById("schoolz").innerHTML.slice(-2)
  // }
}).catch(function(error){
    console.log(error);
});

let values={}
let values_codes=[]

function funct(){
  document.getElementById('schoolz').innerHTML=document.getElementById("schoollist").value;  

  params={
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

  apigClient.schoolsProgramsGet(params, {} , {}).then(function(res){
    // values = res['data'];
    // values_codes = Object.keys(res['data'])
    subjects = Object.values(res['data'])
    subjectcodes = Object.keys(res['data'])
    console.log(values)
    funcpr();
    }).catch(function(error){
        console.log(error);
    });
}

function funcprogram(){
  document.getElementById('schoolz').innerHTML=document.getElementById("schoollist").value;  
  document.getElementById('programz').innerHTML=document.getElementById("programlist").value; 
}

let subjects = []
let subjectcodes = []

function funcpr(){
  var select = document.createElement("select");
  select.name = "programs";
  select.id = "programlist";
  select.className="form-select";

  sortedSubjects = sortLists(subjects,subjectcodes)
  for (const subject of sortedSubjects) {
    var option = document.createElement("option");
    option.value = subject.code;
    option.text = subject.name;
    select.appendChild(option);
  }

  var label = document.createElement("label");
  label.innerHTML = "Subject: "
  label.htmlFor = "program";

  document.getElementById("drppr").appendChild(label).appendChild(select);
  document.getElementById('programz').innerHTML=document.getElementById("programlist").value;  
}

apigClient.schoolsProgramsGet(params, {} , {}).then(function(res){
  // values = res['data'];
  // values_codes = Object.keys(res['data'])
  subjects = Object.values(res['data'])
  subjectcodes = Object.keys(res['data'])
  console.log(values)
  funcpr();
  }).catch(function(error){
      console.log(error);
  });

let coursedata = {}

function sortLists(names,codes) {
  //1) combine the arrays:
  var list = [];
  for (var j = 0; j < names.length; j++) 
      list.push({'name': names[j], 'code': codes[j]});

  //2) sort:
  list.sort(function(a, b) {
      return ((a.name < b.name) ? -1 : ((a.name == b.name) ? 0 : 1));
      //Sort could be modified to, for example, sort on the age 
      // if the name is the same.
  });

  //3) separate them back out:
  // for (var k = 0; k < list.length; k++) {
  //     names[k] = list[k].name;
  //     codes[k] = list[k].code;
  // }
  return list
}

function search() {
  let filter = document.getElementById("filter").value;
  // let results = document.getElementById("insidecouse");
  const filteredResults = results.filter((course)=>{
    if (course['name'].includes(filter)){
      return true;
    }
    return false;
  });
  generateList(filteredResults);
  
}

function generateList(courses){

  document.getElementById("insidecouse").innerHTML="";

  for (i in courses){

    var li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML=courses[i]['name'];

    var anchor = document.createElement("a");
    anchor.href="review.html?q="+courses[i]['parameters'];
    anchor.style.textDecoration="none";
    anchor.appendChild(li);

    document.getElementById("insidecouse").appendChild(anchor);
  }

}

function searchcourse(){

  results = []
  document.getElementById("results-section").style.display="block";

  let element3 = document.getElementById("insidecouse");
  while (element3.firstChild) {
    element3.removeChild(element3.firstChild);
  }

  school=document.getElementById('schoolz').innerHTML
  program= document.getElementById('programz').innerHTML;

  params={
    "Authorization": access_token,
    "school": document.getElementById("schoolz").innerHTML.slice(-2),
    "program": document.getElementById('programz').innerHTML
  }


  apigClient.coursesGet(params, {} , {}).then(function(res){
    coursedata=res['data'];
    for(const course in coursedata){
      results.push({
        name: coursedata[course]['name'],
        parameters: coursedata[course]['id']
      })
    }
    console.log(results)
    generateList(results)
  }).catch(function(error){
      console.log(error);
  });
}

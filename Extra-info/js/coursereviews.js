//User info
var access_token = localStorage.getItem("id_token");
var params={
    "Authorization":access_token,
    "school":"UC"    
}
var body={
    "Authorization":access_token
    }
    console.log(params);
console.log(access_token);

var apigClient = apigClientFactory.newClient({ });
console.log(apigClient)
apigClient.usersUserGet(params, body , {}).then(function(res){
  
  console.log(res["data"]);
  userdata=res["data"];
  
  document.getElementById("username").innerHTML=userdata["username"];
  document.getElementById("school").innerHTML=userdata["school"];
  document.getElementById("program").innerHTML=userdata["program"] + " Major";
  document.getElementById("semester").innerHTML=userdata["semester"];


  
}).catch(function(result){
    
    console.log("NO RESULT");
});
//get schools from api
//
apigClient.schoolsGet(params, {} , {}).then(function(res){
  
var schools = Object.keys(res['data']);
var codes=Object.values(res['data'])
var select = document.createElement("select");
//class class="form-select"
//select.className = "list-group-item";
select.name = "schools";
select.id = "schoollist"
for (const val of schools)
{
    var option = document.createElement("option");
    option.value = val+" - "+res['data'][val];
    option.text = val.charAt(0).toUpperCase() + val.slice(1);
    select.appendChild(option);
}
var label = document.createElement("label");
label.innerHTML = "School "
label.htmlFor = "schools";
document.getElementById("drp").appendChild(label).appendChild(select);
//console.log(document.getElementById("schoollist").value);
document.getElementById('schoolz').innerHTML=document.getElementById("schoollist").value;
params={
    "Authorization":access_token,
    "school":    document.getElementById("schoolz").innerHTML.slice(-2)
}  
}).catch(function(result){
    
    console.log("NO RESULT");
});

let values={}
let values_codes=[]
function funct(){

    document.getElementById('schoolz').innerHTML=document.getElementById("schoollist").value;  
    console.log(document.getElementById("schoolz").innerHTML.slice(-2));
    params={
    "Authorization":access_token,
    "school":    document.getElementById("schoolz").innerHTML.slice(-2) 
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
  console.log(res['data']);
  values={}; 
  
values = res['data'];
values_codes=Object.keys(res['data']);
console.log(values_codes);
funcpr();
  }).catch(function(result){
      
      console.log("NO RESULT");
  });

console.log("inside func");

console.log(values);





}
function funcprogram(){
    document.getElementById('schoolz').innerHTML=document.getElementById("schoollist").value;  
    document.getElementById('programz').innerHTML=document.getElementById("programlist").value; 
    



}

//schools end
//console.log(document.getElementById('schoolz').innerHTML);

//get programs from school

function funcpr(){

var select = document.createElement("select");
select.name = "programs";
select.id = "programlist"
    console.log(values_codes);
for (const val of values_codes)
{
    //console.log(values_codes[val]);
    var option = document.createElement("option");
    option.value = val;
    option.text = values[val].charAt(0).toUpperCase() + values[val].slice(1);
    select.appendChild(option);
}

var label = document.createElement("label");
label.innerHTML = "Choose your Program: "
label.htmlFor = "program";

document.getElementById("drppr").appendChild(label).appendChild(select);
document.getElementById('programz').innerHTML=document.getElementById("programlist").value;  


    
}
apigClient.schoolsProgramsGet(params, {} , {}).then(function(res){
  
  //console.log(res['data']);
  values=res['data'];
  values_codes=Object.keys(res['data'])
  funcpr(); 
  }).catch(function(result){
      
      console.log("NO RESULT");
  });

  let coursedata={}

  function searchcourse(){
    let element3 = document.getElementById("insidecouse");
    while (element3.firstChild) {
    element3.removeChild(element3.firstChild);
    }
    params={
    "Authorization":access_token,
    "school":    document.getElementById("schoolz").innerHTML.slice(-2),
    "program": document.getElementById('programz').innerHTML
    }
    school=document.getElementById('schoolz').innerHTML
    program= document.getElementById('programz').innerHTML;
    //coursesGet()
    apigClient.coursesGet(params, {} , {}).then(function(res){
  
    console.log(res['data']);
    //document.getElementById('courses').innerHTML=JSON.stringify(res['data']);
    coursedata=res['data'];

  //append data to table
  
  //console.log(coursedata);
  for(const course in coursedata){
    var li = document.createElement("li");
    //console.log(coursedata[course]);
    li.className = "list-group-item";
    li.innerHTML=coursedata[course]['name'];
    var anchor = document.createElement("a");
    anchor.href="review.html?q="+coursedata[course]['id'];
    anchor.style.textDecoration="none";
    //anchor.innerHTML=coursedata[course]['name'];
    anchor.appendChild(li);
    document.getElementById("insidecouse").appendChild(anchor);
  }

  //end


  }).catch(function(result){
      
      console.log("NO RESULT");
  });

  
  

  }

//User info
var access_token = localStorage.getItem("id_token");
var queryString_url = window.location.search;
const urlParams = new URLSearchParams(queryString_url);
const courseid = urlParams.get('q')

function addreview(){
  var url="newreview.html?q="+courseid;
  window.location.replace(url);
}

var params={
  "Authorization":access_token,
  "courseID":courseid
  }
var body={
  "Authorization":access_token
  }

function reverseMapping(obj){
  var ret = {};
  for(var key in obj){
    ret[obj[key]] = key;
    }
  console.log("ret", ret)
  return ret;
  
  }

var apigClient = apigClientFactory.newClient({ });

apigClient.coursesCourseGet(params, body , {}).then(function(res){

  schoolcode = res['data']['school']
  schoolname = ""

  apigClient.schoolsGet(params, {} , {}).then(function(obj) {
    schools = obj['data'];
    schools = reverseMapping(schools)
    schoolname = schools[schoolcode]

    document.getElementById("coursename").innerHTML=res['data']['name'];
    document.getElementById("description").innerHTML=res['data']['description'];
    document.getElementById("credits").innerHTML=res['data']['credits'];
    document.getElementById("school").innerHTML=schoolname;

  }).catch(function(error){
    console.log(error);
  })

}).catch(function(error){
    console.log(error);
});

//reviews for the course
apigClient.reviewsGet(params, body , {}).then(function(res){
  reviews=res['data'];
  var total=0;
  var count=0;
  studentname = "";

  for(const review in reviews){
    var outerdiv=document.createElement("div");
    outerdiv.className = "card";
    outerdiv.id="outtter";

    var innerdiv=document.createElement("span");
    innerdiv.className = "card-header";
    innerdiv.style.float = "right"
    innerdiv.innerHTML="<b>Professor: </b>"+reviews[review]['professor']+", <b>Rating: </b>" +reviews[review]['quality'] + ", <b>Mandatory Attendance: </b>" +reviews[review]['mandatoryAttendance'] + ", <b>Grade: </b>" +reviews[review]['grade'] ;

    var pelement=document.createElement("span");
    pelement.style.float = "right"
    pelement.innerHTML=reviews[review]['createdTimestamp'].substring(0,10);

    var secondinnerdiv=document.createElement("div");
    secondinnerdiv.className = "card-body";
    secondinnerdiv.innerHTML=""+reviews[review]['user']+" says, </br>"+"\""+reviews[review]['reviewtext']+"\"";

    document.getElementById("reviews").appendChild(outerdiv).appendChild(innerdiv).appendChild(pelement);
    outerdiv.appendChild(secondinnerdiv);
    count+=1
    total=total+parseFloat(reviews[review]['quality']);
  }
  document.getElementById("overall-rating").innerHTML=(total/count).toFixed(2);

}).catch(function(error){
    console.log(error);
});






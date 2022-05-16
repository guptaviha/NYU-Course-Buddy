//User info
var access_token = localStorage.getItem("id_token");
let queryString_url = window.location.search;
const urlParams = new URLSearchParams(queryString_url);
const courseid = urlParams.get('q')

var params={
  "Authorization":access_token,
  }

var body={
  "Authorization":access_token
  }

var apigClient = apigClientFactory.newClient({});

apigClient.usersUserGet(params, body , {}).then(function(res){
  userdata=res["data"];
  document.getElementById("username").innerHTML=userdata["username"];
  document.getElementById("school").innerHTML=userdata["school"];
  document.getElementById("program").innerHTML=userdata["program"] + " Major";
  document.getElementById("semester").innerHTML=userdata["semester"];
}).catch(function(error){
    console.log(error);
});

function addReview(){

  var params={
    "Authorization":access_token,
    "courseID":courseid
    }

  var professor=document.getElementById("proffesor").value;
  var quality=document.getElementById("quality").value;
  var atd=document.getElementById("attendenace").value;
  var grade=document.getElementById("grade").value;
  var reviewtext=document.getElementById("reviewtext").value;

  if(atd==="on"){
      var attendence=1
  }else{
      var attendence=0
  }

  var body={
    "quality":quality,
    "reviewtext":reviewtext,
    "professor":professor,
    "attendenace":attendence,
    "grade":grade
  }

  var apigClient = apigClientFactory.newClient({ });

  apigClient.reviewsReviewPost(params, body , {}).then(function(res){
    window.location.replace("review.html?q="+courseid);
  }).catch(function(error){
      console.log(error);
  });
}











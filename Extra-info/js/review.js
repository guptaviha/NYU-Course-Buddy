//User info
var access_token = localStorage.getItem("id_token");
var queryString_url = window.location.search;
const urlParams = new URLSearchParams(queryString_url);
const courseid = urlParams.get('q')
function addreview(){
  //var btn=document.getElementById("button_for_new_review");
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


//
var apigClient = apigClientFactory.newClient({ });
//Fetching course details
apigClient.coursesCourseGet(params, body , {}).then(function(res){
  
  console.log(res['data']);
  //coursename
  document.getElementById("coursename").innerHTML=res['data']['name'];
  // document.getElementById("recent_profs").innerHTML+=res['data']['recentprofessors'];
  document.getElementById("description").innerHTML=res['data']['description'];
  document.getElementById("credits").innerHTML=res['data']['credits'];
  document.getElementById("school").innerHTML=res['data']['school'];



  
}).catch(function(result){
    
    console.log("NO RESULT");
});



//reviews for the course
apigClient.reviewsGet(params, body , {}).then(function(res){
  
  reviews=res['data'];
  console.log(reviews);
  var total=0;
  var count=0;
  for(const review in reviews){
    // var li = document.createElement("li");
    // //console.log(coursedata[course]);
    // li.className = "list-group-item";
    // li.innerHTML=coursedata[course]['name'];
    // document.getElementById("whishlists").appendChild(li);
    
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
    secondinnerdiv.innerHTML="User "+reviews[review]['user']+" says, </br>"+"\""+reviews[review]['reviewtext']+"\"";

    document.getElementById("reviews").appendChild(outerdiv).appendChild(innerdiv).appendChild(pelement);
    outerdiv.appendChild(secondinnerdiv);
    count+=1
    total=total+parseFloat(reviews[review]['quality']);
    
  }
  document.getElementById("rating").innerHTML=total/count;

  
}).catch(function(result){
    
    console.log("NO RESULT");
});






//User info
//var access_token = localStorage.getItem("id_token");
//console.log(access_token);
var access_token="eyJraWQiOiIrRUlCVHBVTngyeGhcLzg3MEpSUEh0T2QzRUdlRU1wZG1EZ3UxTkpTMWptOD0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiZWl4Y3R1QVkxc01FelFsajY1bjJmZyIsInN1YiI6IjAwMzI1YWM2LTE5YWQtNGY0MC05MDFhLTBlNjc2ZTkwNmZhMSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9MVDZmT1ZnQ2IiLCJjb2duaXRvOnVzZXJuYW1lIjoiYmFwcGkiLCJhdWQiOiI1NTliMXQ2bWxya2hycDIwdm9uOXE0djJhZCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjUyNjQ2OTM3LCJleHAiOjE2NTI2NTA1MzcsImlhdCI6MTY1MjY0NjkzNywianRpIjoiZGQyOGU4ZjktN2QxZC00YmQ1LTg3NjMtYWIzZWM3ZTM1NzljIiwiZW1haWwiOiJjaGkuYmhhcmF0aHNhaUBnbWFpbC5jb20ifQ.Eqt14iFCkHmA5aZlLd-fhEIgbvtn5IX32LTr_yS-qoJEaQKoG_uaoX2f2iLkUbrgnqCP3x6MGfkeOINFmvF9fSbFNTf4jNBOU9K0G3aUYE5rtbv4k_hLRN-YxydczwaFoJd-acZjEzE6767fpU0sH1RwiN5I1jpS6SB-vHYWW-Gk6LP96TwuQHN2YOD0iWdiYy4nSES7xj0nsbwxgf7JW85IOXQI9P2v7RCX7tOKHqCNFBquN47KyUsq1yxSfWUmcc8ggFQ2BmaxIjx6Ra6yyiRqDsffx2Hxs6qGqJFpgkQmZHiufL20iLXhy7xCvi0ohbUUULaQomSvIX4U9UCRXw";
var queryString_url = window.location.search;
const urlParams = new URLSearchParams(queryString_url);
const courseid = urlParams.get('q')
function addreview(){
  //var btn=document.getElementById("button_for_new_review");
  var url="/Users/bharath/Desktop/Stuff/SEM-2/CC/Project/GIT/NYU-Smart-Hub/Extra-info/newreview.html?q="+courseid;
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
  document.getElementById("recent_profs").innerHTML+=res['data']['recentprofessors'];
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
    var innerdiv=document.createElement("div");
    innerdiv.className = "card-header";
    innerdiv.innerHTML="Professor:-"+reviews[review]['professor']+", Rating: " +reviews[review]['quality'];
    var pelement=document.createElement("p");
    pelement.innerHTML=reviews[review]['createdTimestamp'].substring(0,10);
    var secondinnerdiv=document.createElement("div");
    secondinnerdiv.className = "card-body";
    secondinnerdiv.innerHTML=""+reviews[review]['user']+" says, </br>"+reviews[review]['reviewtext'];
    document.getElementById("reviews").appendChild(outerdiv).appendChild(innerdiv).appendChild(pelement);
    outerdiv.appendChild(secondinnerdiv);
    count+=1
    total=total+parseFloat(reviews[review]['quality']);
    
  }
  document.getElementById("rating").innerHTML=total/count;

  
}).catch(function(result){
    
    console.log("NO RESULT");
});






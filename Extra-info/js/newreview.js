//User info
//var access_token = localStorage.getItem("id_token");
//console.log(access_token);
let access_token="eyJraWQiOiIrRUlCVHBVTngyeGhcLzg3MEpSUEh0T2QzRUdlRU1wZG1EZ3UxTkpTMWptOD0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiZWl4Y3R1QVkxc01FelFsajY1bjJmZyIsInN1YiI6IjAwMzI1YWM2LTE5YWQtNGY0MC05MDFhLTBlNjc2ZTkwNmZhMSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9MVDZmT1ZnQ2IiLCJjb2duaXRvOnVzZXJuYW1lIjoiYmFwcGkiLCJhdWQiOiI1NTliMXQ2bWxya2hycDIwdm9uOXE0djJhZCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjUyNjQ2OTM3LCJleHAiOjE2NTI2NTA1MzcsImlhdCI6MTY1MjY0NjkzNywianRpIjoiZGQyOGU4ZjktN2QxZC00YmQ1LTg3NjMtYWIzZWM3ZTM1NzljIiwiZW1haWwiOiJjaGkuYmhhcmF0aHNhaUBnbWFpbC5jb20ifQ.Eqt14iFCkHmA5aZlLd-fhEIgbvtn5IX32LTr_yS-qoJEaQKoG_uaoX2f2iLkUbrgnqCP3x6MGfkeOINFmvF9fSbFNTf4jNBOU9K0G3aUYE5rtbv4k_hLRN-YxydczwaFoJd-acZjEzE6767fpU0sH1RwiN5I1jpS6SB-vHYWW-Gk6LP96TwuQHN2YOD0iWdiYy4nSES7xj0nsbwxgf7JW85IOXQI9P2v7RCX7tOKHqCNFBquN47KyUsq1yxSfWUmcc8ggFQ2BmaxIjx6Ra6yyiRqDsffx2Hxs6qGqJFpgkQmZHiufL20iLXhy7xCvi0ohbUUULaQomSvIX4U9UCRXw";
let queryString_url = window.location.search;
const urlParams = new URLSearchParams(queryString_url);
const courseid = urlParams.get('q')


var params={
    "Authorization":access_token,
    //"courseID":courseid
    }
var body={
    "Authorization":access_token
    }

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
//

function addReview(){

    var params={
        "Authorization":access_token,
        "courseID":courseid
        }
        //var username=document.getElementById("username").innerHTML;
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
        console.log(body);
        //reviewsReviewPost
        var apigClient = apigClientFactory.newClient({ });
        console.log(apigClient)
        apigClient.reviewsReviewPost(params, body , {}).then(function(res){
            console.log(res);
            alert("Hello! I am an alert box!!");
            window.location.replace("/Users/bharath/Desktop/Stuff/SEM-2/CC/Project/GIT/NYU-Smart-Hub/Extra-info/review.html?q="+courseid);

        }).catch(function(result){
            
            console.log("NO RESULT");
        });
}











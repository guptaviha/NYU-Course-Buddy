//User info
//var access_token = localStorage.getItem("id_token");
//console.log(access_token);
let access_token="eyJraWQiOiIrRUlCVHBVTngyeGhcLzg3MEpSUEh0T2QzRUdlRU1wZG1EZ3UxTkpTMWptOD0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoicDdqYnVfeDhaa3pNLXNFeGdHa2sxdyIsInN1YiI6ImNiODlhOWY5LTAxYjctNDMxZC05MGFiLWMwZWFkMmU4MGMxZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9MVDZmT1ZnQ2IiLCJjb2duaXRvOnVzZXJuYW1lIjoidmcyMjM3IiwiYXVkIjoiNTU5YjF0Nm1scmtocnAyMHZvbjlxNHYyYWQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY1MjY3NTk5NiwiZXhwIjoxNjUyNzYyMzk2LCJpYXQiOjE2NTI2NzU5OTYsImp0aSI6IjRkMGQyMmFjLWIyZDUtNDU0NC04NGE5LWFhYTA0OWEwODJmMiIsImVtYWlsIjoidmcyMjM3QG55dS5lZHUifQ.tx8DV7LAVqIWNuH18s90sXYohp2C6B83NUU0nSU06EbABZ6tXp-9Py8nSecIJfRLywl7dtrcrsZyvl9sx4TBn0JMp858GWNJ6rTrRk_ixiJecMSLFvLtlADgTxFjiqyolVoJMB3WxafV20nZRGQ4IbFssGmCB1c5-E72G8pZK9Wz951TuvQjl5eKkT3S6dFRbNjjPCkuBAZ_Kdnf5W8GVPMXoGZznoO8JTLfIiTdg0NQ0kF9YHj87aHYf8FuO-KDm9CdUx48Z0gTuWNyya2Q7ixgDDf1VhbL4tH667L_wNtWkdgjZwvBWZlKBsdTVBnrAlvgKxy9KBZA46tCLKIqmw";
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











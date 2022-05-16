//User info
var access_token = localStorage.getItem("id_token");
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
            // alert("Hello! I am an alert box!!");
            window.location.replace("review.html?q="+courseid);

        }).catch(function(result){
            
            console.log("NO RESULT");
        });
}











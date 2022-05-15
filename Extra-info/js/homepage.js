//User info
//var access_token = localStorage.getItem("id_token");
//console.log(access_token);
var access_token="eyJraWQiOiIrRUlCVHBVTngyeGhcLzg3MEpSUEh0T2QzRUdlRU1wZG1EZ3UxTkpTMWptOD0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiRnlIMkRwcTJzckQ0aV9TcXZCQThmQSIsInN1YiI6IjI2OGU4YjhjLTAxOWQtNGExNC1iZWUxLTA2Y2QwZDE5Y2NjMiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9MVDZmT1ZnQ2IiLCJjb2duaXRvOnVzZXJuYW1lIjoiYmMzMTc3IiwiYXVkIjoiNTU5YjF0Nm1scmtocnAyMHZvbjlxNHYyYWQiLCJldmVudF9pZCI6IjZiZTU4NTA1LTVkNjEtNDA3Yy04YTM2LTVhM2ZkYTkxYThhOSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjUyNTg5NjcyLCJleHAiOjE2NTI1OTMyNzIsImlhdCI6MTY1MjU4OTY3MiwianRpIjoiNDQwZTMwNTEtMDZhNy00OWRjLTg3NjAtMjdmMTYzNjJhYzM2IiwiZW1haWwiOiJiYzMxNzdAbnl1LmVkdSJ9.BLWfDldpTAAfEDyYd3eiAcFXGLbbmoDoswPCdwMPm2xG8VuU9tj9Y0QIAwK7Lfffs1tldVpKZCjXRbLWyrRzz3-L0QBN5oIW396pJKDE16KwwooDp_uI7JBLscyXs0Aghh4XxjCMtJMHdf0s_CgTj1dStl7n0K-0-FfdDkFdT4YJnuEOlSCqdyEjdaOhX_eYibC-p3fEbPqhbvQtZbojVk9IbKx9tpt-Nm76sJNyE1Jzc9XKmZJ1sf_UGXTJ3vzS-qIV9qu2YdGL2RLpy1N_6neXacxUbisCbPpt3szNJoWu3m4_X7KLfPOQuafWM9o7zw3rqADqd_e3wHreB5Xb6g";

var params={
    "Authorization":access_token
    }
var body={
    "Authorization":access_token
    }

var apigClient = apigClientFactory.newClient({ });
console.log(apigClient)
apigClient.usersUserGet(params, body , {}).then(function(res){
  
  console.log(res["data"]);
  userdata=res["data"];
  
  document.getElementById("username").innerHTML=document.getElementById("username").innerHTML+userdata["username"];
  document.getElementById("school").innerHTML=document.getElementById("school").innerHTML+userdata["school"];
  document.getElementById("program").innerHTML=document.getElementById("program").innerHTML+userdata["program"];
  document.getElementById("semester").innerHTML=document.getElementById("semester").innerHTML+userdata["semester"];


  
}).catch(function(result){
    
    console.log("NO RESULT");
});
//

//Whislist
//function whishlistGet()
apigClient.whishlistGet(params, body , {}).then(function(res){
  
  console.log(res["data"][0]);
  document.getElementById("whishlist").innerHTML=document.getElementById("whishlist").innerHTML+JSON.stringify(res["data"]);


  
}).catch(function(result){
    
    console.log("NO RESULT");
});

function courses(){
    window.location.replace("https://host-bucket-cloud.s3.us-east-1.amazonaws.com/Extra-info/reviews.html");
}
//User info
//var access_token = localStorage.getItem("id_token");
//console.log(access_token);
var access_token="eyJraWQiOiIrRUlCVHBVTngyeGhcLzg3MEpSUEh0T2QzRUdlRU1wZG1EZ3UxTkpTMWptOD0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiNjlDa0RDc0hfQlJWaFczVlJGMGNfUSIsInN1YiI6IjI2OGU4YjhjLTAxOWQtNGExNC1iZWUxLTA2Y2QwZDE5Y2NjMiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9MVDZmT1ZnQ2IiLCJjb2duaXRvOnVzZXJuYW1lIjoiYmMzMTc3IiwiYXVkIjoiNTU5YjF0Nm1scmtocnAyMHZvbjlxNHYyYWQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY1MjYyNTg5MiwiZXhwIjoxNjUyNjI5NDkyLCJpYXQiOjE2NTI2MjU4OTIsImp0aSI6IjY3ZDYyNzYxLWQ1YWYtNGM4MC1hZDdjLWQ4OWE3Mzk5YjM3NyIsImVtYWlsIjoiYmMzMTc3QG55dS5lZHUifQ.sHrKzfNbMM6SB_VusZfiNvg-vC6eO3f6TKXwKObQjz5ABKruSleS3t2G9fUUrBdsSRkFsnI5Gw-HZ5024D1PKgFxa02cN75vpYq7UT-FYgqGisjkAIgR1MbyvaA15BjKmge-3X8dWzwygDj-xUsiUzPlEjVb7bKIwMBlAbZIz8kbKGG8rAwjVTX3ggpcUBK-HPZtLy31bhWP7g9Slm070c-NVuVlVpiAeEEbq1zzgO8wfSBGI7nIx3qtKCdl7bWvxbmfklUTZHEpfP-ZZpQ5Xuuo88WB15xAg_Yt53pIavlY0fteNovXy2ZEH1pLS9ao9DwBBi7JssZhkifkyCGZHA";

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
  
  document.getElementById("username").innerHTML=userdata["username"];
  document.getElementById("school").innerHTML=userdata["school"];
  document.getElementById("program").innerHTML=userdata["program"] + " Major";
  document.getElementById("semester").innerHTML=userdata["semester"];



  
}).catch(function(result){
    
    console.log("NO RESULT");
});
//

//Whislist
//function whishlistGet()
apigClient.whishlistGet(params, body , {}).then(function(res){
  
  console.log(res["data"]);
  var coursedata=res["data"];
  document.getElementById("whishlist").innerHTML=document.getElementById("whishlist").innerHTML+JSON.stringify(res["data"]);
  for(const course in coursedata){
    var li = document.createElement("li");
    //console.log(coursedata[course]);
    li.className = "list-group-item";
    li.innerHTML=coursedata[course]['name'];
    document.getElementById("whishlists").appendChild(li);
  }
 

  
}).catch(function(result){
    
    console.log("NO RESULT");
});

function courses(){
    window.location.replace("https://host-bucket-cloud.s3.us-east-1.amazonaws.com/Extra-info/reviews.html");
}
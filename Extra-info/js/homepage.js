//User info
var access_token = localStorage.getItem("id_token");
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
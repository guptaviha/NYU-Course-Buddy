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
  
  document.getElementById("username1").innerHTML=userdata["studentname"];
  document.getElementById("school").innerHTML=userdata["school"];
  document.getElementById("program").innerHTML=userdata["program"] + " Major";
  document.getElementById("semester").innerHTML=userdata["semester"];
  document.getElementById("year").innerHTML=userdata["year"];
  
}).catch(function(result){
    
    console.log("NO RESULT");
});
//

//Whislist
apigClient.whishlistGet(params, body , {}).then(function(res){
  console.log(res["data"]);
  var coursedata=res["data"];
  //document.getElementById("whishlist").innerHTML=document.getElementById("whishlist").innerHTML+JSON.stringify(res["data"]);
  for(const course in coursedata){
    document.getElementById('wishlist-items').innerHTML += '<a href ="'+ 'review.html?q=' + coursedata[course]['courseid'] + '" class="list-group-item list-group-item-action">' + coursedata[course]['name'] + '</a>' 
/*    var li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML=coursedata[course]['name'];
    document.getElementById("wishlist-items").appendChild(li);*/
  }
 

  
}).catch(function(result){
    
    console.log("NO RESULT");
});

function courses(){
    window.location.replace("https://host-bucket-cloud.s3.us-east-1.amazonaws.com/Extra-info/reviews.html");
}
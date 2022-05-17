//User info
var access_token = localStorage.getItem("id_token");
var params={
    "Authorization":access_token
    }
var body={
    "Authorization":access_token
    }
var apigClient = apigClientFactory.newClient({ });
let semesterLOV = { "fa":"Fall","sp":"Spring","su":"Summer","ja":"Winter"}
let schools = {}
apigClient.schoolsGet(params, {} , {}).then(function(res) {
        schools = res['data'];
        schools = reverseMapping(schools)
        let userdata = {}
          apigClient.usersUserGet(params, body , {}).then(function(res){
          userdata=res["data"];

          var innerParams={
          "Authorization":access_token,
          "school":userdata["school"]
          }
          let programs = {}
          apigClient.schoolsProgramsGet(innerParams, {} , {}).then(function(res) {        
              programs = res['data'];
              document.getElementById("program").innerHTML=programs[userdata["program"]] + " Major";
          }).catch(function(result){
              console.log("Error fetching programs for school.");
          });
          document.getElementById("username1").innerHTML=userdata["studentname"];
          document.getElementById("school").innerHTML=schools[userdata["school"]];
          document.getElementById("semester").innerHTML=semesterLOV[userdata["semester"]];
          document.getElementById("year").innerHTML=userdata["year"];
        
      }).catch(function(result){
          
          console.log("NO RESULT");
      });

}).catch(function(result){
    console.log("Error getting schools data!");
});




//Whislist
apigClient.whishlistGet(params, body , {}).then(function(res){
  var coursedata=res["data"];
  
  for(const course in coursedata){
    document.getElementById('wishlist-items').innerHTML += 
    '<a href ="'+ 'review.html?q=' + coursedata[course]['courseid'] 
    + '" class="list-group-item list-group-item-action">' 
    + coursedata[course]['name'] + "  - " + semesterLOV[coursedata[course]['semester']] + " " + coursedata[course]['year']
    + " - " + coursedata[course]["lastStatus"]
    + '</a></br>'//+'<button class="class="btn btn-primary" ><a href="deletewhislist.html?courseid='+coursedata[course]['courseid']+'&school='+coursedata[course]['school']+'&program='+coursedata[course]['program']+'&section='+coursedata[course]['section']+'&year='+coursedata[course]['year']+'">Delete</a><button>'
    document.getElementById('wishlist-items').style.width="800px"; 
    document.getElementById('wishlist-items').style.float="left"; 

    var button=document.createElement("button");
     button.id="outerbutton";
     button.innerHTML="Delete";
     button.style.width="200px";
     button.style.float="right";
     var anchor=document.createElement("a");
     anchor.href='deletewhislist.html?courseid='+coursedata[course]['courseid']+'&school='+coursedata[course]['school']+'&program='+coursedata[course]['program']+'&section='+coursedata[course]['section']+'&year='+coursedata[course]['year'];
     document.getElementById('wishlist-items').appendChild(button).appendChild(anchor);
     
/*    var li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML=coursedata[course]['name'];
    document.getElementById("wishlist-items").appendChild(li);*/
  }
}).catch(function(result){
  console.log("Error!");

});


function reverseMapping(obj){
  var ret = {};
  for(var key in obj){
  ret[obj[key]] = key;
  }
    return ret;
  }
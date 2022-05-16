var queryString = window.location.hash;
const urlParams = new URLSearchParams(queryString);
const access_token = urlParams.get("#id_token");
if(access_token==null){
    access_token = localStorage.getItem("id_token");
}else{
    localStorage.setItem("id_token",access_token);
}
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
  if(userdata["school"]==="NAN"){
    console.log("Not redirecting.");
  }else{
    window.location.replace("https://host-bucket-cloud.s3.us-east-1.amazonaws.com/Extra-info/homepage.html");
  }

  
}).catch(function(result){
    console.log("Error retrieving user data!");
});

 let userdata={};
 let username='';
 apigClient.usersUserGet(params, body , {}).then(function(res){ 
     userdata=res["data"];
     username=userdata['username'];
 }).catch(function(result){
     
     console.log("Error getting user data");
 });

//schools
apigClient.schoolsGet(params, {} , {}).then(function(res){
    
    let schools = Object.keys(res['data']);
    let codes=Object.values(res['data']);
    console.log(res['data']);
    var select = document.createElement("select");
    select.className="form-select";
    select.id="schoollist";
    // //option
    document.getElementById("schools").appendChild(select);
    // console.log(data);
    for(const school in schools){
        var option = document.createElement("option");
        option.value=""+codes[school];
        option.innerHTML=""+schools[school];
        document.getElementById("schoollist").appendChild(option);
        
    }
    
    }).catch(function(result){
        
        console.log("NO RESULT");
    });


function schoolChange(){
    let element_to_remove = document.getElementById("programs");
    while (element_to_remove.firstChild) {
        element_to_remove.removeChild(element_to_remove.firstChild);
    }


    var apigClient = apigClientFactory.newClient({ });
    var element=document.getElementById("schoollist");
    var value = element.options[element.selectedIndex].value;
    var params={
        "Authorization":access_token,
        "school":value
      }
    console.log(value);

    apigClient.schoolsProgramsGet(params, {} , {}).then(function(res){
        console.log(res['data']);
        
        
        
        var program_codes=Object.keys(res['data']);
        var programs=Object.values(res['data']);
        //console.log(values_codes);
        
        //drop down for programs
        var select = document.createElement("select");
        select.className="form-select";
        select.id="programlist";
        // //option
        document.getElementById("programs").appendChild(select);
        // console.log(data);
        for(const code in program_codes){
            console.log(program_codes[code]);
            var option = document.createElement("option");
            option.value=""+program_codes[code];
            option.innerHTML=""+programs[code];
            document.getElementById("programlist").appendChild(option);
        
        }




        }).catch(function(result){
            
            console.log("NO RESULT");
        });

}




 function updateDetails(){
    var element=document.getElementById("schoollist");
    var school_selected = element.options[element.selectedIndex].value;
    var element_for_prog=document.getElementById("programlist");
    var program_selected = element_for_prog.options[element_for_prog.selectedIndex].value;


    var school = school_selected;
    var year = document.getElementById("year").value;

    var program = program_selected;
    var semester = document.getElementById("semester").value;
    //username=document.getElementById("username").innerHTML;
    var body={
      
       "username":username,
       "year":year,
       "school":school,
       "program":program,
       "semester":semester,


    }
    console.log(body);
    
    console.log(apigClient);
    
    var additionalParams = {};
    apigClient.rootPost(params, body , additionalParams).then(function(res){
      
      console.log("success");
      window.location.replace("/Users/bharath/Desktop/Stuff/SEM-2/CC/Project/GIT/NYU-Smart-Hub/Extra-info/dashboard.html");

    }).catch(function(result){
        
        console.log("NO RESULT");
    });

}
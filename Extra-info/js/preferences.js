
 var access_token="eyJraWQiOiIrRUlCVHBVTngyeGhcLzg3MEpSUEh0T2QzRUdlRU1wZG1EZ3UxTkpTMWptOD0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoibGhzSmYxVkRmMkU1UWlqZ2hKODhCdyIsInN1YiI6IjI2OGU4YjhjLTAxOWQtNGExNC1iZWUxLTA2Y2QwZDE5Y2NjMiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9MVDZmT1ZnQ2IiLCJjb2duaXRvOnVzZXJuYW1lIjoiYmMzMTc3IiwiYXVkIjoiNTU5YjF0Nm1scmtocnAyMHZvbjlxNHYyYWQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY1MjY1NTI4OSwiZXhwIjoxNjUyNjU4ODg5LCJpYXQiOjE2NTI2NTUyODksImp0aSI6IjIxMjRiOWQ3LWNlOGEtNDNlNC1hMTE2LWExNjNmZmZlNWU4YiIsImVtYWlsIjoiYmMzMTc3QG55dS5lZHUifQ.Z7Wxli3I7kIis2KfUKMlCjmimhz96KxaCZ6_Y_arO63fUouBnVMZ2EICsco7ciCFD3m_db1MV9NDbU1qaihZpImUqk6MnuTpdG8gIgSo6FAZ3yMSDziQ1D6YZOp8xfnRzMHCyoZRFO-vd-PBPgSG0b1FNMcugp6w-oRzR7C9aFe7XhUt2q1FfVCxPV02LW4AEuJ2-BYRMDXjbtRNkQ4WGq-THFV52ZL66jYa7jfRWjB_BD52Kkqo0UQG5KlkAMhS1pS_t0q5_m9XKatFBGNbDwW7sS_seTTlygR9ie2hELVgVrZUH6kswPKV_6Pk1QtGA1vHlrO5_EYs-73bC9OGIA";
 localStorage.setItem("id_token",access_token);
 let userdata={};
 let username='';
 var apigClient = apigClientFactory.newClient({ });
 var params={
   "Authorization":access_token
 }
 var body={
   "Authorization":access_token
 }
 console.log(body);
 apigClient.usersUserGet(params, body , {}).then(function(res){
   
     userdata=res["data"];
     username=userdata['username'];
     console.log(username);
     //document.getElementById("username").innerHTML=username;
 }).catch(function(result){
     
     console.log("NO RESULT");
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
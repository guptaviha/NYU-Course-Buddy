var queryString = window.location.hash;
const urlParams = new URLSearchParams(queryString);
var access_token = urlParams.get("#id_token");
//access_token = "eyJraWQiOiIrRUlCVHBVTngyeGhcLzg3MEpSUEh0T2QzRUdlRU1wZG1EZ3UxTkpTMWptOD0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoicDdqYnVfeDhaa3pNLXNFeGdHa2sxdyIsInN1YiI6ImNiODlhOWY5LTAxYjctNDMxZC05MGFiLWMwZWFkMmU4MGMxZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9MVDZmT1ZnQ2IiLCJjb2duaXRvOnVzZXJuYW1lIjoidmcyMjM3IiwiYXVkIjoiNTU5YjF0Nm1scmtocnAyMHZvbjlxNHYyYWQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY1MjY3NTk5NiwiZXhwIjoxNjUyNzYyMzk2LCJpYXQiOjE2NTI2NzU5OTYsImp0aSI6IjRkMGQyMmFjLWIyZDUtNDU0NC04NGE5LWFhYTA0OWEwODJmMiIsImVtYWlsIjoidmcyMjM3QG55dS5lZHUifQ.tx8DV7LAVqIWNuH18s90sXYohp2C6B83NUU0nSU06EbABZ6tXp-9Py8nSecIJfRLywl7dtrcrsZyvl9sx4TBn0JMp858GWNJ6rTrRk_ixiJecMSLFvLtlADgTxFjiqyolVoJMB3WxafV20nZRGQ4IbFssGmCB1c5-E72G8pZK9Wz951TuvQjl5eKkT3S6dFRbNjjPCkuBAZ_Kdnf5W8GVPMXoGZznoO8JTLfIiTdg0NQ0kF9YHj87aHYf8FuO-KDm9CdUx48Z0gTuWNyya2Q7ixgDDf1VhbL4tH667L_wNtWkdgjZwvBWZlKBsdTVBnrAlvgKxy9KBZA46tCLKIqmw"
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

let userdata={};
let username='';
apigClient.usersUserGet(params, body , {}).then(function(res) {
  
  userdata=res["data"];
  username=userdata['username'];
  if(userdata["school"]==="NAN"){
  }else{
    window.location.replace("https://host-bucket-cloud.s3.us-east-1.amazonaws.com/Extra-info/homepage.html");
  }
  document.getElementById("username").innerHTML = userdata['studentname']
}).catch(function(result){
    console.log("Error retrieving user data!");
});

//schools
apigClient.schoolsGet(params, {} , {}).then(function(res) {
        let schools = Object.keys(res['data']);
        let codes=Object.values(res['data']);
        sortLists(schools,codes)
        var select = document.createElement("select");
        select.className="form-select";
        select.id="schoollist";
        document.getElementById("schools").appendChild(select);
        for(const school in schools){
            var option = document.createElement("option");
            option.value=""+codes[school];
            option.innerHTML=""+schools[school];
            document.getElementById("schoollist").appendChild(option);
        }
    }).catch(function(result){
        console.log("Error getting schools data!");
    });

function sortLists(names,codes) {
        //1) combine the arrays:
        var list = [];
        for (var j = 0; j < names.length; j++) 
            list.push({'name': names[j], 'age': codes[j]});

        //2) sort:
        list.sort(function(a, b) {
            return ((a.name < b.name) ? -1 : ((a.name == b.name) ? 0 : 1));
            //Sort could be modified to, for example, sort on the age 
            // if the name is the same.
        });

        //3) separate them back out:
        for (var k = 0; k < list.length; k++) {
            names[k] = list[k].name;
            codes[k] = list[k].age;
        }
}

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

    apigClient.schoolsProgramsGet(params, {} , {}).then(function(res) {        
            var program_codes=Object.keys(res['data']);
            var programs=Object.values(res['data']);
            sortLists(programs,program_codes)
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
            console.log("Error fetching programs for school.");
        });

}

 function updateDetails(){
    var element=document.getElementById("schoollist");
    var school_selected = element.options[element.selectedIndex].value;
    var element_for_prog=document.getElementById("programlist");
    var program_selected = element_for_prog.options[element_for_prog.selectedIndex].value;


    var school = school_selected;
    var year = document.getElementById("year").value;
    var studentname = document.getElementById("studentname").value;

    var program = program_selected;
    var semester = document.getElementById("semester").value;
    var body={
       "username":username,
       "year":year,
       "school":school,
       "program":program,
       "semester":semester,
       "studentname": studentname
    }
    console.log(body);
    
    console.log(apigClient);
    
    var additionalParams = {};
    apigClient.rootPost(params, body , additionalParams).then(function(res){
      window.location.replace("/Users/bharath/Desktop/Stuff/SEM-2/CC/Project/GIT/NYU-Smart-Hub/Extra-info/dashboard.html");
    }).catch(function(result){
    });

}
function submittoRDS(){
    console.log('Im here');
    var queryString = window.location.hash;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const access_token = urlParams.get("#id_token");
    if(access_token==null){
      access_token = localStorage.getItem("id_token");
    }else{
    localStorage.setItem("id_token",access_token);
    console.log(access_token);
    }
    var apigClient = apigClientFactory.newClient({ });
    var params={
      "Authorization":access_token
    }
    var body={
      "Authorization":access_token
    }
    console.log(body);
    apigClient.usersUserGet(params, body , {}).then(function(res){
      
      console.log(res["data"]);
      userdata=res["data"];
      if(userdata["school"]==="NAN"){
        console.log("here jbkj");
               



      }else{
        console.log("not here");
      }

      
    }).catch(function(result){
        
        console.log("NO RESULT");
    });

    //var school = document.getElementById("school").value;
    var school = document.getElementById("school").value;
    var program = document.getElementById("program").value;
    var semester = document.getElementById("semester").value;
    
    var body={
      "Authorization":access_token,
       "username":userdata["username"],
       "school":school,
       "program":program,
       "semester":semester,


    }
    console.log(body);
    
    console.log(apigClient);
    var params={
      "Authorization":access_token
    }
    var additionalParams = {};
    apigClient.rootPost(params, body , additionalParams).then(function(res){
      
      console.log("success");
      window.location.replace("Google.com");

    }).catch(function(result){
        
        console.log("NO RESULT");
    });

  

  

}
function submittoRDS(){
    console.log('Im here');
    //var school = document.getElementById("school").value;
    var username = document.getElementById("school").value;
    var program = document.getElementById("program").value;
    var semester = document.getElementById("semester").value;
    
    var body={
       "username":"bc3177",
       "school":school,
       "program":program,
       "semester":semester,


    }
    console.log(body);
    var apigClient = apigClientFactory.newClient({ apiKey: "J56OUp8mfX96lMIfRICIM39qmd7vrNXE1A1bYsze" });
    console.log(apigClient);
    var params={}
    var additionalParams = {};
    apigClient.rootPost(params, body , additionalParams).then(function(res){
      console.log("success");
      console.log(res);
      showImages(res.data)
    }).catch(function(result){
        console.log(result);
        console.log("NO RESULT");
    });

  

  

}
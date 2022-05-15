const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
//User info
var access_token="eyJraWQiOiIrRUlCVHBVTngyeGhcLzg3MEpSUEh0T2QzRUdlRU1wZG1EZ3UxTkpTMWptOD0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoibGhzSmYxVkRmMkU1UWlqZ2hKODhCdyIsInN1YiI6IjI2OGU4YjhjLTAxOWQtNGExNC1iZWUxLTA2Y2QwZDE5Y2NjMiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9MVDZmT1ZnQ2IiLCJjb2duaXRvOnVzZXJuYW1lIjoiYmMzMTc3IiwiYXVkIjoiNTU5YjF0Nm1scmtocnAyMHZvbjlxNHYyYWQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY1MjY1NTI4OSwiZXhwIjoxNjUyNjU4ODg5LCJpYXQiOjE2NTI2NTUyODksImp0aSI6IjIxMjRiOWQ3LWNlOGEtNDNlNC1hMTE2LWExNjNmZmZlNWU4YiIsImVtYWlsIjoiYmMzMTc3QG55dS5lZHUifQ.Z7Wxli3I7kIis2KfUKMlCjmimhz96KxaCZ6_Y_arO63fUouBnVMZ2EICsco7ciCFD3m_db1MV9NDbU1qaihZpImUqk6MnuTpdG8gIgSo6FAZ3yMSDziQ1D6YZOp8xfnRzMHCyoZRFO-vd-PBPgSG0b1FNMcugp6w-oRzR7C9aFe7XhUt2q1FfVCxPV02LW4AEuJ2-BYRMDXjbtRNkQ4WGq-THFV52ZL66jYa7jfRWjB_BD52Kkqo0UQG5KlkAMhS1pS_t0q5_m9XKatFBGNbDwW7sS_seTTlygR9ie2hELVgVrZUH6kswPKV_6Pk1QtGA1vHlrO5_EYs-73bC9OGIA";


//localStorage.getItem("id_token");
console.log(access_token);
var params={
    "Authorization":access_token
    }
var body={
    "Authorization":access_token
    }
var apigClient = apigClientFactory.newClient({ });
apigClient.dashboardTopwishlistedGet(params, body , {}).then(function(res){
  console.log(res["data"]);
  res["data"].forEach(function(subject) {
    document.getElementById('wishlist-items').innerHTML += '<li class="list-group-item">' + subject.name + '</li>'  
  });
    
}).catch(function(result){
    console.log("Error in fetching top wishlisted items!");
});

apigClient.dashboardTopratedGet(params, body , {}).then(function(res){
  console.log(res["data"]);
  res["data"].forEach(function(subject) {
    document.getElementById('rated-items').innerHTML += '<li class="list-group-item">' + subject.name + '</li>'  
  });  
}).catch(function(result){
    console.log("Error in fetching top rated items!");
});

apigClient.dashboardMostreviewedGet(params, body , {}).then(function(res){
  console.log(res["data"]);
    res["data"].forEach(function(subject) {
    document.getElementById('reviewed-items').innerHTML += '<li class="list-group-item">' + subject.name + '</li>'  
  });
}).catch(function(result){
    console.log("Error in fetching top reviewed items!");
});        
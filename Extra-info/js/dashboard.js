//User info
var access_token = "eyJraWQiOiIrRUlCVHBVTngyeGhcLzg3MEpSUEh0T2QzRUdlRU1wZG1EZ3UxTkpTMWptOD0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoidGRleGxDZWh6dGM1YXE5SGFfYWV6ZyIsInN1YiI6IjI2OGU4YjhjLTAxOWQtNGExNC1iZWUxLTA2Y2QwZDE5Y2NjMiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9MVDZmT1ZnQ2IiLCJjb2duaXRvOnVzZXJuYW1lIjoiYmMzMTc3IiwiYXVkIjoiNTU5YjF0Nm1scmtocnAyMHZvbjlxNHYyYWQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY1MjU3OTgyNCwiZXhwIjoxNjUyNTgzNDI0LCJpYXQiOjE2NTI1Nzk4MjQsImp0aSI6IjIxNjI0MWJmLTE5YWEtNGM0Yi1iMzUyLTgyYzRjOGE5NWJiZSIsImVtYWlsIjoiYmMzMTc3QG55dS5lZHUifQ.dZqHcFhh55Vvihn7j0Fjd5VLooa87TbjjccbIBTT-T4eQBYDz4POfeBEnoMjOPymOkc73_M0O6n0k9w0TS1dmftPiao8_49vlZ3pnUyNXrJ_5fb5Hzq7aaU-opaotzszA7s89O-j_obn5semdO8r6GYpqCGOS0PcJv8UD7-A_ghlN4jJAjfk9HQ5zKzSDOCFew9T8Cp7ac52RazuS2bOlzeSJf_Q54rZ1cbA29igzkfVgwMoLLgKJpBL9J9qkbNe5gh-VtZR_2UO_h7QdIfq0aVGx3l3Zc-EvclAMyRpc-A0Fg5am3MqP-CqSCO-D39hgxys1x01Wi8WhIYMp3dkcQ"
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
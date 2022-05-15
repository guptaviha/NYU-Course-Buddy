//User info
var access_token = "eyJraWQiOiIrRUlCVHBVTngyeGhcLzg3MEpSUEh0T2QzRUdlRU1wZG1EZ3UxTkpTMWptOD0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiZng3REYzUWFXRmlfSG81Q1J3SGM2dyIsInN1YiI6IjI2OGU4YjhjLTAxOWQtNGExNC1iZWUxLTA2Y2QwZDE5Y2NjMiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9MVDZmT1ZnQ2IiLCJjb2duaXRvOnVzZXJuYW1lIjoiYmMzMTc3IiwiYXVkIjoiNTU5YjF0Nm1scmtocnAyMHZvbjlxNHYyYWQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY1MjU1NTU4MiwiZXhwIjoxNjUyNTU5MTgyLCJpYXQiOjE2NTI1NTU1ODIsImp0aSI6ImFkMDY0MTIyLWFiZjYtNGQ3MC1hMTVjLTVhYmIzMjZjZjBmZCIsImVtYWlsIjoiYmMzMTc3QG55dS5lZHUifQ.t8t52VaVC8X5KmbWIqmPRQgLVPDpknaDtj3IP32Oh2uoVG506CeQE79HZMX9MDdmCkLt5RyS-K50xSFelBVy0NZTRYjE07mTDAJlKqRpZdYb4VAZudskAMpruiTfvR4ac11O_1SXToDx5OvBXka6mbXPuma-RQNW9zrt8ADzVC45s4GEQFvzSdOBUbvFBV5HbwCYCUhNlBA1w1H57MEthhN2AlF8VFtfSX2DNa1H1NLOE5kvwYNUn0huwVsdy49umFSTbqFeSD6fwo-BHsqctYCESV-dB3Xlqy6TCVlEmQXMyAFmx3K7nXEQpM1svaSJzumb2t8Or0Oyko19qbmOBQ"
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
  document.getElementById("wishlistItems").innerHTML=document.getElementById("wishlistItems").innerHTML+JSON.stringify(res["data"]);   
}).catch(function(result){
    console.log("Error in fetching top wishlisted items!");
});

apigClient.dashboardTopratedGet(params, body , {}).then(function(res){
  console.log(res["data"]);
  document.getElementById("ratedItems").innerHTML=document.getElementById("ratedItems").innerHTML+JSON.stringify(res["data"]);   
}).catch(function(result){
    console.log("Error in fetching top wishlisted items!");
});

apigClient.dashboardMostreviewedGet(params, body , {}).then(function(res){
  console.log(res["data"]);
  document.getElementById("reviewedItems").innerHTML=document.getElementById("reviewedItems").innerHTML+JSON.stringify(res["data"]);   
}).catch(function(result){
    console.log("Error in fetching top wishlisted items!");
});        
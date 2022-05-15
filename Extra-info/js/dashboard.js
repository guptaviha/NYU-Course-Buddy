const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
//User info
var access_token="eyJraWQiOiIrRUlCVHBVTngyeGhcLzg3MEpSUEh0T2QzRUdlRU1wZG1EZ3UxTkpTMWptOD0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiRnlIMkRwcTJzckQ0aV9TcXZCQThmQSIsInN1YiI6IjI2OGU4YjhjLTAxOWQtNGExNC1iZWUxLTA2Y2QwZDE5Y2NjMiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9MVDZmT1ZnQ2IiLCJjb2duaXRvOnVzZXJuYW1lIjoiYmMzMTc3IiwiYXVkIjoiNTU5YjF0Nm1scmtocnAyMHZvbjlxNHYyYWQiLCJldmVudF9pZCI6IjZiZTU4NTA1LTVkNjEtNDA3Yy04YTM2LTVhM2ZkYTkxYThhOSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjUyNTg5NjcyLCJleHAiOjE2NTI1OTMyNzIsImlhdCI6MTY1MjU4OTY3MiwianRpIjoiNDQwZTMwNTEtMDZhNy00OWRjLTg3NjAtMjdmMTYzNjJhYzM2IiwiZW1haWwiOiJiYzMxNzdAbnl1LmVkdSJ9.BLWfDldpTAAfEDyYd3eiAcFXGLbbmoDoswPCdwMPm2xG8VuU9tj9Y0QIAwK7Lfffs1tldVpKZCjXRbLWyrRzz3-L0QBN5oIW396pJKDE16KwwooDp_uI7JBLscyXs0Aghh4XxjCMtJMHdf0s_CgTj1dStl7n0K-0-FfdDkFdT4YJnuEOlSCqdyEjdaOhX_eYibC-p3fEbPqhbvQtZbojVk9IbKx9tpt-Nm76sJNyE1Jzc9XKmZJ1sf_UGXTJ3vzS-qIV9qu2YdGL2RLpy1N_6neXacxUbisCbPpt3szNJoWu3m4_X7KLfPOQuafWM9o7zw3rqADqd_e3wHreB5Xb6g";
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
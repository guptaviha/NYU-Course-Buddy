const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
//User info
var access_token="eyJraWQiOiIrRUlCVHBVTngyeGhcLzg3MEpSUEh0T2QzRUdlRU1wZG1EZ3UxTkpTMWptOD0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiNDdNUEpSbmVxVEZQNnBiM2t0X3dDdyIsInN1YiI6IjI2OGU4YjhjLTAxOWQtNGExNC1iZWUxLTA2Y2QwZDE5Y2NjMiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9MVDZmT1ZnQ2IiLCJjb2duaXRvOnVzZXJuYW1lIjoiYmMzMTc3IiwiYXVkIjoiNTU5YjF0Nm1scmtocnAyMHZvbjlxNHYyYWQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY1MjY0NzczMCwiZXhwIjoxNjUyNjUxMzMwLCJpYXQiOjE2NTI2NDc3MzAsImp0aSI6ImJlNmUzOTMwLTdjNDEtNGRkYi04NzVhLTRiNGIzN2M2OGI5MSIsImVtYWlsIjoiYmMzMTc3QG55dS5lZHUifQ.JGKX2uRn1uGGDtRH94wsIn1JeJ2sLpJiB5cp4X2HEB7gTp6Uuv3U7nj6kGAkg06QNqkhkVMDAaDvTt78SHMg5Z5rvcPC78q-8dcixZVv_cn8BdBmI6uGNPh3LcCIDiM1AahPTc5BxHJTzLo31GxGuvDIoE383_deCPYlzzQfpNxq7CJojnRL7ac8Y3xqx--zov1YBFcmVbKAXwSzNipHRvLcLwKAZqrvx-yX5h4Bl8MHnFkFGaJZXj30b5vXUa7Ar9RvIQHFFa3JbAdD8LXmiwtiP7EgbLVV9kVqfd8u7om085i0SLoOXY0kaBkTfvS2gW2ekRFEp2mnGxyjymPhTA";
//var access_token = localStorage.getItem("id_token");
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
    // <a href="#" class="list-group-item list-group-item-action">A second link item</a>
    document.getElementById('wishlist-items').innerHTML += '<a href ="'+ 'review.html?q=' + subject.courseid + '" class="list-group-item list-group-item-action">' + subject.name + '</a>' 
    //document.getElementById('wishlist-items').innerHTML += '<li class="list-group-item">' + subject.name + '</li>'  
  });
    
}).catch(function(result){
    console.log("Error in fetching top wishlisted items!");
});

apigClient.dashboardTopratedGet(params, body , {}).then(function(res){
  console.log(res["data"]);
  res["data"].forEach(function(subject) {
    document.getElementById('rated-items').innerHTML += '<a href ="'+ 'review.html?q=' + subject.id + '" class="list-group-item list-group-item-action">' + subject.name + " | Avg Rating: "+ parseFloat(subject.rating).toFixed(2) + '</a>'    
    //document.getElementById('rated-items').innerHTML += '<li class="list-group-item">' + subject.name + '</li>'  
  });  
}).catch(function(result){
    console.log("Error in fetching top rated items!");
});

apigClient.dashboardMostreviewedGet(params, body , {}).then(function(res){
  console.log(res["data"]);
    res["data"].forEach(function(subject) {
    document.getElementById('reviewed-items').innerHTML += '<a href ="'+ 'review.html?q=' + subject.id + '" class="list-group-item list-group-item-action">' + subject.name + '</a>'    
    //document.getElementById('reviewed-items').innerHTML += '<li class="list-group-item">' + subject.name + '</li>'  
  });
}).catch(function(result){
    console.log("Error in fetching top reviewed items!");
});        
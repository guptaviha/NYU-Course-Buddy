const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
//User info
var access_token = localStorage.getItem("id_token");
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
  });
    
}).catch(function(result){
    console.log("Error in fetching top wishlisted items!");
});

apigClient.dashboardTopratedGet(params, body , {}).then(function(res){
  console.log(res["data"]);
  res["data"].forEach(function(subject) {
    document.getElementById('rated-items').innerHTML += '<a href ="'+ 'review.html?q=' + subject.id + '" class="list-group-item list-group-item-action">' + subject.name + " | Rating: "+ parseFloat(subject.rating).toFixed(2) + '</a>'    
  });  
}).catch(function(result){
    console.log("Error in fetching top rated items!");
});

apigClient.dashboardMostreviewedGet(params, body , {}).then(function(res){
  console.log(res["data"]);
    res["data"].forEach(function(subject) {
    document.getElementById('reviewed-items').innerHTML += '<a href ="'+ 'review.html?q=' + subject.id + '" class="list-group-item list-group-item-action">' + subject.name + '</a>'    
  });
}).catch(function(result){
    console.log("Error in fetching top reviewed items!");
});        
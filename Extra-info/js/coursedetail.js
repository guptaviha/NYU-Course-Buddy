//User info
//var access_token = localStorage.getItem("id_token");
//console.log(access_token);
var access_token = "eyJraWQiOiIrRUlCVHBVTngyeGhcLzg3MEpSUEh0T2QzRUdlRU1wZG1EZ3UxTkpTMWptOD0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoicDdqYnVfeDhaa3pNLXNFeGdHa2sxdyIsInN1YiI6ImNiODlhOWY5LTAxYjctNDMxZC05MGFiLWMwZWFkMmU4MGMxZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9MVDZmT1ZnQ2IiLCJjb2duaXRvOnVzZXJuYW1lIjoidmcyMjM3IiwiYXVkIjoiNTU5YjF0Nm1scmtocnAyMHZvbjlxNHYyYWQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY1MjY3NTk5NiwiZXhwIjoxNjUyNzYyMzk2LCJpYXQiOjE2NTI2NzU5OTYsImp0aSI6IjRkMGQyMmFjLWIyZDUtNDU0NC04NGE5LWFhYTA0OWEwODJmMiIsImVtYWlsIjoidmcyMjM3QG55dS5lZHUifQ.tx8DV7LAVqIWNuH18s90sXYohp2C6B83NUU0nSU06EbABZ6tXp-9Py8nSecIJfRLywl7dtrcrsZyvl9sx4TBn0JMp858GWNJ6rTrRk_ixiJecMSLFvLtlADgTxFjiqyolVoJMB3WxafV20nZRGQ4IbFssGmCB1c5-E72G8pZK9Wz951TuvQjl5eKkT3S6dFRbNjjPCkuBAZ_Kdnf5W8GVPMXoGZznoO8JTLfIiTdg0NQ0kF9YHj87aHYf8FuO-KDm9CdUx48Z0gTuWNyya2Q7ixgDDf1VhbL4tH667L_wNtWkdgjZwvBWZlKBsdTVBnrAlvgKxy9KBZA46tCLKIqmw";
var queryString_url = window.location.search;
const urlParams = new URLSearchParams(queryString_url);
const courseid = urlParams.get('courseid');
const school = urlParams.get('school');
const subject = urlParams.get('subject');
const year = urlParams.get('year');
const name = urlParams.get('name');
const semester = urlParams.get('semester');
function addreview(){
  //var btn=document.getElementById("button_for_new_review");
  var url="newreview.html?q="+courseid;
  window.location.replace(url);

}
var params={
    "Authorization":access_token,
    "courseID":courseid
    }
var body={
    "Authorization":access_token
    }


fetch(`https://schedge.a1liu.com/${year}/${semester}/search?full=true&school=${school}&subject=${subject}&query=${name}`).then((res)=>{
  // fetch("https://schedge.a1liu.com/2021/fa/search?full=true&school=GY&subject=CS&query=Software Engineering I").then((res)=>{
  res.json().then(obj=>{
    console.log(obj);
    const sections = obj[0]["sections"];
    let detailsHTML = '';
    for (let i = 0; i < sections.length; i++) {
      detailsHTML = detailsHTML + `
      <div class="card">
        <div class="card-header" style="display: flex; justify-content: space-between">
          <div style="max-width:70%">
            <b>Name: </b>
            <span style="max-width:75%">${sections[i]["name"]}</span>
            <br>
            <b>Code: </b>
            ${sections[i]["code"]}
            <b>Registration Number: </b>
            ${sections[i]["registrationNumber"]}
          </div>
          <div>
            <a href="review.html?q=${courseid}">
              <button type="button" class="btn btn-primary">Go To Review</button>
            </a>
            <button type="button" class="btn btn-secondary" onclick="addToWishlist()">+ Wishlist</button>
          </div>
        </div>

        <div class="card-body">
          <b>Instructor: </b>
          ${sections[i]["instructors"].join(', ')}
          <br>
          <b>Status: </b>
          ${sections[i]["status"]}
          <br>
          <b>Type: </b>
          ${sections[i]["type"]}
          <b>Instruction Mode: </b>
          ${sections[i]["instructionMode"]}
          <br>
          <b>Campus: </b>
          ${sections[i]["campus"]}
          <b>Location: </b>
          ${sections[i]["location"]}
          <br>
          <b>Min Credits: </b>
          ${sections[i]["minUnits"]}
          <b>Max Credits: </b>
          ${sections[i]["maxUnits"]}
          <br>
        </div>
      </div><br>`
  

      
      
    }
    document.getElementById("details").innerHTML=detailsHTML

  })
})



//
var apigClient = apigClientFactory.newClient({ });
//Fetching course details
apigClient.coursesCourseGet(params, body , {}).then(function(res){
  
  // console.log(res['data']);
  //coursename
  document.getElementById("coursename").innerHTML=res['data']['name'];
  document.getElementById("recent_profs").innerHTML+=res['data']['recentprofessors'];
  document.getElementById("description").innerHTML=res['data']['description'];
  document.getElementById("credits").innerHTML=res['data']['credits'];
  document.getElementById("school").innerHTML=res['data']['school'];



  
}).catch(function(result){
    
    console.log("NO RESULT");
});



//reviews for the course
apigClient.reviewsGet(params, body , {}).then(function(res){
  
  reviews=res['data'];
  // console.log(reviews);
  var total=0;
  var count=0;
  for(const review in reviews){
    // var li = document.createElement("li");
    // //console.log(coursedata[course]);
    // li.className = "list-group-item";
    // li.innerHTML=coursedata[course]['name'];
    // document.getElementById("whishlists").appendChild(li);
    
    var outerdiv=document.createElement("div");
    outerdiv.className = "card";
    outerdiv.id="outtter";
    var innerdiv=document.createElement("div");
    innerdiv.className = "card-header";
    innerdiv.innerHTML="Professor:-"+reviews[review]['professor']+", Rating: " +reviews[review]['quality'];
    var pelement=document.createElement("p");
    pelement.innerHTML=reviews[review]['createdTimestamp'].substring(0,10);
    var secondinnerdiv=document.createElement("div");
    secondinnerdiv.className = "card-body";
    secondinnerdiv.innerHTML=""+reviews[review]['user']+" says, </br>"+reviews[review]['reviewtext'];
    document.getElementById("reviews").appendChild(outerdiv).appendChild(innerdiv).appendChild(pelement);
    outerdiv.appendChild(secondinnerdiv);
    count+=1
    total=total+parseFloat(reviews[review]['quality']);
    
  }
  document.getElementById("rating").innerHTML=total/count;

  
}).catch(function(result){
    
    console.log("NO RESULT");
});






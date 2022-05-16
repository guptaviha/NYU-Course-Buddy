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
const coursename = urlParams.get('name');
const semester = urlParams.get('semester');




fetch(`https://schedge.a1liu.com/${year}/${semester}/search?full=true&school=${school}&subject=${subject}&query=${coursename}`).then((res)=>{
  // Dynamically encapsulate html content in string and display in "details" id
  res.json().then(obj=>{
    console.log(obj);
    const sections = obj[0]["sections"];
    let detailsHTML = `
      <div style="display: flex; justify-content: space-between">
        <div>
          <h2>Sections:</h2>
        </div>
        <div>
          <a href="review.html?q=${courseid}">
            <button type="button" class="btn btn-primary">Go To Review</button>
          </a>
        </div>
      </div>`;
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
            <button type="button" class="btn btn-success" onclick="addWishlist('${sections[i]["code"]}', '${sections[i]["status"]}', '${sections[i]["name"]}')">+ Wishlist</button>
            <button type="button" class="btn btn-danger" onclick="removeWishlist('${sections[i]["code"]}')">- Wishlist</button>
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
    document.getElementById("details").innerHTML=detailsHTML;
  })
})




var apigClient = apigClientFactory.newClient({ });

//Fetching course details
var params={
  "Authorization":access_token,
  "courseID":courseid
  }

var body={
  "Authorization":access_token
  }

apigClient.coursesCourseGet(params, body , {}).then(function(res){
  document.getElementById("coursename").innerHTML=res['data']['name'];
  document.getElementById("recent_profs").innerHTML+=res['data']['recentprofessors'];
  document.getElementById("description").innerHTML=res['data']['description'];
  document.getElementById("credits").innerHTML=res['data']['credits'];
  document.getElementById("school").innerHTML=res['data']['school'];
}).catch(function(result){
    console.log("NO RESULT");
});


// Add to wishlist
function addWishlist(section, status, sectionname){
  console.log("inside addWishlist")
  console.log(sectionname)
  var params={
    "Authorization":access_token
    }
  var body={
    "Authorization":access_token,
    "courseid":courseid,
    "section": section,
    "year": year,
    "semester": semester,
    "program": subject,
    "school": school,
    "lastStatus": status,
    "name": sectionname
    }
  apigClient.whishlistPost(params, body , {}).then(function(res){
    console.log("whishlistPost result");
    console.log(res);
    if (res.status == 200) {
      console.log("200");
      document.getElementById("toast-message").innerHTML=res.data;
      document.getElementById("my-toast").style = "position: fixed; top: 80px; right: 20px; display:block; opacity:1; transition:all 0.6s;";
      setTimeout(()=>{
        document.getElementById("my-toast").style = "position: fixed; top: 80px; right: 20px; display:block; opacity:0; transition:all 0.6s;";
      },6000)
    }
  }).catch(function(error){
      console.log(error);
  });
}



// Remove from wishlist
function removeWishlist(section){
  console.log("inside removeWishlist")
  var params={
    "Authorization":access_token,
    "courseid":courseid,
    "section": section,
    "year": year,
    "program": subject,
    "school": school,
    }
  var body={
    "Authorization":access_token
    }
  apigClient.whishlistDelete(params, body , {}).then(function(res){
    console.log("whishlistDelete result");
    console.log(res);
    if (res.status == 200) {
      console.log("200");
      document.getElementById("toast-message").innerHTML=res.data;
      document.getElementById("my-toast").style = "position: fixed; top: 80px; right: 20px; display:block; opacity:1; transition:all 0.6s;";
      setTimeout(()=>{
        document.getElementById("my-toast").style = "position: fixed; top: 80px; right: 20px; display:block; opacity:0; transition:all 0.6s;";
      },6000)
    }
  }).catch(function(error){
      console.log(error);
  });
}
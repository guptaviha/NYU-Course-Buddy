//User info
var access_token = localStorage.getItem("id_token");
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

    document.getElementById("coursename").innerHTML=obj[0]['name'];
    document.getElementById("description").innerHTML=obj[0]['description'];
    document.getElementById("credits").innerHTML=obj[0]["sections"][0]['maxUnits'];
    document.getElementById("school").innerHTML=obj[0]['subjectCode']['school'];
    document.getElementById("semester").innerHTML=semester;
    document.getElementById("year").innerHTML=year;

    console.log(obj);
    const sections = obj[0]["sections"];
    let detailsHTML = `
      <div style="display: flex; justify-content: space-between">
        <div>
          <h2>Sections</h2>
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

var params={
  "Authorization":access_token,
  "courseID":courseid
  }

var body={
  "Authorization":access_token
  }

// Add to wishlist
function addWishlist(section, status, sectionname){
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
    if (res.status == 200) {
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
    if (res.status == 200) {
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
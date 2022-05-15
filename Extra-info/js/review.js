//User info
//var access_token = localStorage.getItem("id_token");
//console.log(access_token);
var access_token="eyJraWQiOiIrRUlCVHBVTngyeGhcLzg3MEpSUEh0T2QzRUdlRU1wZG1EZ3UxTkpTMWptOD0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiM3RRSV81Skg3Sl9PYm5Vc3V0ZktMdyIsInN1YiI6IjI2OGU4YjhjLTAxOWQtNGExNC1iZWUxLTA2Y2QwZDE5Y2NjMiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9MVDZmT1ZnQ2IiLCJjb2duaXRvOnVzZXJuYW1lIjoiYmMzMTc3IiwiYXVkIjoiNTU5YjF0Nm1scmtocnAyMHZvbjlxNHYyYWQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY1MjY0MDIwMSwiZXhwIjoxNjUyNjQzODAxLCJpYXQiOjE2NTI2NDAyMDEsImp0aSI6ImY3YTUwNjJkLTc3YWMtNGU5OS04ZDgzLWM5YmRiNjExMGViMiIsImVtYWlsIjoiYmMzMTc3QG55dS5lZHUifQ.AEEGzoIyEm7cNUCwNb3P4mIh7szb9Np8A-AzneGX2RozRjqnYJKHApwFya7EEQtUMxyKIiKCX3vtg3OPfieBbCx50jx7JIsF_le4z0tt8WPTFWPyr8ZMOhDr1yKqa87OElBYd-hZGmimJDPmX-4CwC5D42Fujt7R2BpxHyAQnTzPVwMHOOFikvFgV4Nh9IGvmfaume4jnJQXzh7ALpAcMdFrg1_idK8-nDNIOzCj7n3e8o7vatkiVr1KYBQ13xuglCz4eJxV5LsNftjJlTN11zs4lTSvO7Fd6w5Z31tl4UO_4R89b0sIL12F3VcUeN-Ic5g_5yWH1eSdbwpdSeQjgg";
var queryString_url = window.location.search;
const urlParams = new URLSearchParams(queryString_url);
const courseid = urlParams.get('q')

var params={
    "Authorization":access_token,
    "courseID":courseid
    }
var body={
    "Authorization":access_token
    }


//


var apigClient = apigClientFactory.newClient({ });
apigClient.reviewsGet(params, body , {}).then(function(res){
  
  reviews=res['data'];
  console.log(reviews);
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
    innerdiv.innerHTML="Professor:-"+reviews[review]['professor'];
    var pelement=document.createElement("p");
    pelement.innerHTML=reviews[review]['createdTimestamp'].substring(0,10);
    var secondinnerdiv=document.createElement("div");
    secondinnerdiv.className = "card-body";
    secondinnerdiv.innerHTML=""+reviews[review]['user']+" says, </br>"+reviews[review]['reviewtext'];
    document.getElementById("reviews").appendChild(outerdiv).appendChild(innerdiv).appendChild(pelement);
    outerdiv.appendChild(secondinnerdiv);

    
  }

  
}).catch(function(result){
    
    console.log("NO RESULT");
});






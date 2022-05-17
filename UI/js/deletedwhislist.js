var queryString_url = window.location.search;
const urlParams = new URLSearchParams(queryString_url);
var courseid = urlParams.get('courseid');
var school = urlParams.get('school');
var program = urlParams.get('program');
var section = urlParams.get('section');
var year = urlParams.get('year');
var access_token = localStorage.getItem("id_token");
var params={
    "Authorization":access_token,
    "courseid":courseid,
    "school":school,
    "section":section,
    "year":year,
    "program":program
    }

var apigClient = apigClientFactory.newClient({ });
var body={}
apigClient.whishlistDelete(params, body , {}).then(function(res){
    //console.log(res);
    window.location.replace("homepage.html");

  

  }).catch(function(error){
    console.log(error);
  })
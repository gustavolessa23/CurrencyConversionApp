// APP DEVELOPED BY GUSTAVO LESSA (STUDENT ID 2016104) FOR MOBILE DEVELOPMENT MODULE
// FRAMEWORK7 USED AS INITIAL TEMPLATE
// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Developed by Gustavo Lesa');
})


// On page load, request rate once, by calling the API
var url = 'http://apilayer.net/api/live?access_key=b068934ed17dd36bbd99f0b741397e5f&source=USD&currencies=BRL';
var http = new XMLHttpRequest();
http.open("GET", url); // open request
http.send(); // send request

var foundRate = 0; // placeholder for found rate
http.onreadystatechange = (e) => { // if the http state changes
  var response = http.responseText; // get response
  var responseJSON = JSON.parse(response); // parse JSON so we can actually read info

  var quote = responseJSON.quotes.USDBRL; // get the info we need
  console.log("Quote is a ", typeof quote, " = ", quote); // print to check if quote was retrieved properly
  if (typeof quote == 'number'){ // check type of variable
    console.log("Quote returned"); // print message
    foundRate = quote; // set variable
  }
}

// Convert USD to BRL
function usdbrl(){
  var dollars = Number(document.getElementById("usd").value); // get value typed by user
  var total = foundRate*dollars; // convert value
  document.getElementById('brl').value = ''; // clear field (it was needed, because if user typed something, it wouldn't be overwritten)
  document.getElementById('brl').value = total; // set converted value
  console.log(total); // print total to console
}

// Convert BRL to USD
function brlusd(){
  var reais = document.getElementById("brl").value; // get value typed by user
  var total = reais/foundRate; // convert value
  document.getElementById('usd').value = ''; // clear field
  document.getElementById('usd').value = total; // set converted value
  console.log(total); // print total to console
}


  
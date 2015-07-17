 /* == Don't worry about this code, it will ensure     ==
     == that your ajax calls are allowed by the browser == */

 $.ajaxPrefilter(function(settings, _, jqXHR) {
   jqXHR.setRequestHeader("X-Parse-Application-Id", "Kp6PMGjjfGqMyUyiAB5tVdx3TpZo4wYEQf1aDfwn");
   jqXHR.setRequestHeader("X-Parse-REST-API-Key", "JaeHwikLcLsjnpT3jp59BEDEjWTEXErqO9Uejqjf");
 });


 /* ========================================================= */
 //use this as your AJAX url


var url = 'https://api.parse.com/1/classes/tweets';
// var results = {};

// results = data.results;

 /* ========================================================= */
 //Write your POST request here

var tweet = {};

 // Using the core $.ajax() method
 var post = function(tweet) {
   $.ajax({

     // The URL for the request
     url: url,

     // The data to send (will be converted to a query string)
     data: JSON.stringify(tweet),

     // Whether this is a POST or GET request
     type: "POST",

     // The type of data we expect back
     dataType: "json",

     // Code to run if the request succeeds;
     // the response is passed to the function
     success: function(data) {
       //console.log('I made a POST successfully');
       get();
     },

     // Code to run if the request fails; the raw request and
     // status codes are passed to the function
     error: function(xhr, status, errorThrown) {
       console.log("Sorry, there was a problem!");
       console.log("Error: " + errorThrown);
       console.log("Status: " + status);
       console.dir(xhr);
     },

     // Code to run regardless of success or failure
     complete: function(xhr, status) {
       //console.log("The request is complete!");
     }
   });
 };

post(tweet);

 /* ========================================================= */
 // Write your GET request here


// Using the core $.ajax() method
 var get = function() {
   $.ajax({

     // The URL for the request
     url: url,

     // The data to send (will be converted to a query string)
     data: { order: "-createdAt" },

     // Whether this is a POST or GET request
     type: "GET",

     // The type of data we expect back
     dataType: "json",

     // Code to run if the request succeeds;
     // the response is passed to the function
     success: function(data) {
       console.log(data.results);
       listTweets(data.results);
     },

     // Code to run if the request fails; the raw request and
     // status codes are passed to the function
     error: function(xhr, status, errorThrown) {
       console.log("Sorry, there was a problem!");
       console.log("Error: " + errorThrown);
       console.log("Status: " + status);
       console.dir(xhr);
     },

     // Code to run regardless of success or failure
     complete: function(xhr, status) {
       //console.log("The request is complete!");
     }
   });
 };

// extra credit: make it visual add some nice animation
// e.g. http://jsfiddle.net/4ty6V/

 /* ========================================================= */
 // Write your code here
/*
function listTweets(arr) {
  var tweets = $('#tweets');

  for (var i = 0; i < 100; i++) {
    if (arr[i] && arr[i].username && arr[i].text) {
      var tweet = $("<li>" + arr[i].username + ": " + arr[i].text + "</li>");
      tweet.appendTo(tweets);
    }
  }

}

function makeTweet() {
   console.log($('#username').val());
   var tweet = {
     username: $('#username').val(),
     text: $('#tweet').val()
   };
   console.log('I am a new tweet: ', tweet);
   return tweet;
}
*/

/* ========================================================= */
 // add event listeners

/*
$('#tweet-form').submit(function(event) {
    post(makeTweet());
    event.preventDefault();
});

*/

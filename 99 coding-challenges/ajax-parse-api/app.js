 /* == Don't worry about this code, it will ensure     ==
    == that your ajax calls are allowed by the browser == */

$.ajaxPrefilter(function(settings, _, jqXHR) {
  jqXHR.setRequestHeader("X-Parse-Application-Id", "N8UiK3h4Bc7zoRttId4RJNrKmwP8JFrp9benpYdn");
  jqXHR.setRequestHeader("X-Parse-REST-API-Key", "wVvA7P5fs5l6oOX9tdIBpvugmb4Hv6UAhFve6jvj");
});

/* ========================================================= */

// use this as your AJAX url
var url = 'https://api.parse.com/1/classes/tweets';

var tweet = {
  username: "illy",     // feel free to change this
  text: "Namo Amitofo"  // and this
};

// Write your GET request here

var get = function() {

  $.ajax({
   
      // The URL for the request
      url: url,
   
      // Whether this is a POST or GET request
      type: "GET",
   
      // The type of data we expect back
      dataType : "json",
   
      // Code to run if the request succeeds;
      // the response is passed to the function
      success: function( json ) {
          console.log( "GET worked!");
          console.log(json);
      },
   
      // Code to run if the request fails; the raw request and
      // status codes are passed to the function
      error: function( xhr, status, errorThrown ) {
          console.log( "Error: " + errorThrown );
          console.log( "Status: " + status );
          console.dir( xhr );
      },
   
      // Code to run regardless of success or failure
      complete: function( xhr, status ) {
      }
  });

};

// Write your POST request here

var post = function() {

    $.ajax({
   
      // The URL for the request
      url: url,
   
      // The data to send (will be converted to a query string)
      data: JSON.stringify(tweet),
   
      // Whether this is a POST or GET request
      type: "POST",
   
      // The type of data we expect back
      dataType : "json",
   
      // Code to run if the request succeeds;
      // the response is passed to the function
      success: function( json ) {
          console.log( "POST worked!");
          console.log(json);
      },
   
      // Code to run if the request fails; the raw request and
      // status codes are passed to the function
      error: function( xhr, status, errorThrown ) {
          console.log( "Error: " + errorThrown );
          console.log( "Status: " + status );
          console.dir( xhr );
      },
   
      // Code to run regardless of success or failure
      complete: function( xhr, status ) {
          
      }
  });

};


// Invoke your code here
post();
get();

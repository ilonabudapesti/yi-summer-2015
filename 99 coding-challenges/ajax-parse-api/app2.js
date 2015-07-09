 /* == Don't worry about this code, it will ensure     ==
    == that your ajax calls are allowed by the browser == */

$.ajaxPrefilter(function(settings, _, jqXHR) {
  jqXHR.setRequestHeader("X-Parse-Application-Id", "ClZR3KV5wtiBxwUSRcgCcv9yQfbFpxrc5PebA5lX");
  jqXHR.setRequestHeader("X-Parse-REST-API-Key", "CwL6Cr9WOKzljjhKIc018AgI8BDhDOABjZFZ06g7");
});

/* ========================================================= */

var url = 'https://api.parse.com/1/classes/tweets';

var tweet = {
  username: "illy",
  text: "Namo Amitofo"
};

// Write your GET request here

/*START SOLUTION*/
var get = function(callback) {
  $.ajax({
    url: url,
    type: 'GET',

    // make sure we get the tweets back in the order we want
    data: {order: '-createdAt'},
    success: function(data){
      console.log('GET successful: ', data);

      /* extra credit */
      if (callback){
        callback(data.results);
      }
      /* end extra credit*/
    },
    error: function(err){
      console.log(err);
    }
  });
};
/*END SOLUTION*/

// Write your POST request here

/*START SOLUTION*/
// var post = function() {
//     $.post( url, JSON.stringify(tweet), function (data) {
//         console.log('POST successfully executed!');
//         console.log(data);
//     });
// }; 

var post = function(tweet) {
  $.ajax({
    url: url,
    type: 'POST',
    data: JSON.stringify(tweet),
    success: function(data){
      console.log('POST successful: ', data);
      // get(

      //   /* extra credit */
      //   function(data) {
      //     if (data[0].objectId === post.objectId) {
      //       console.log('latest tweet matches: ', data[0]);
      //     }
      //   }
      //   /* end extra credit */

      // );
    },
    error: function(err) {
      console.log(err);
    }
  });
};
/*END SOLUTION*/

// Invoke your code here

/*START SOLUTION*/
post();
// rather than call get() here, we are going to do it inside
// the post.success method. Since we need to locate the tweet
// we just made from the list of tweets this makes more sense. The
// async nature of these calls also means that without some added
// code we could actually get a list of tweets back before
// ours finishes posting.
/*END SOLUTION*/


// for the curious: 
// http://api.jquery.com/jquery.ajaxprefilter/
// http://api.jquery.com/jquery.post/
// http://api.jquery.com/jquery.get/
// http://learn.jquery.com/ajax/jquery-ajax-methods/
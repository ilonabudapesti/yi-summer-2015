 var app;
 var result = [];
 var hash = {};
  $(document).ready(function() {

   var chat = {
       username: "anonymous",
       message: "insert message",
       room: "lobby"
       // friends: {};
   };

  app = {
      server: 'https://api.parse.com/1/classes/tweets',
       
      init: function() {
           app.fetch();
           app.username = location.search.slice(location.search.indexOf("username=") + 9);
      },
      handleSubmit: function() {
          chat = {
              username: location.search.slice(location.search.indexOf("username=") + 9),
              text: $('#message').val(),
              room: $('#room').val()
          };

          app.send(chat)
      },
      fetch: function() {
          $.ajax({
              type: "GET",
              url: app.server,
              contentType: "application/json",
              dataType: "json",
              data: {order: "-createdAt"},
              success: function(data) {
                  console.log(data);
                  result = data.results;
                  for (var i = 99; i >= 0; i--) {
                    if (result[i].room !== undefined){
                      hash[result[i].room] = result[i].room;
                    }   
                    if( result[i].room === $('#room').val()) {
                      app.addMessage(result[i]);
                    }
                  }            
                  for (var key in hash) {
                    if (!app.isRoomListed(key)) {
                      $('#room').append("<option value =" + hash[key] +">" + hash[key] + "</option>");               
                    }
                  }
              }
          
         })

      },
      isRoomListed: function (room) {
        var kids = $('#room').children();
                for (var i = 0; i < kids.length; i++) {
                  if (room === $(kids[i]).val()) {
                    return true;
                  }
                }
                return false;
      },

      send: function(chat) {
          $.ajax({
              type: "POST",
              url: app.server,
              data: JSON.stringify(chat),
              contentType: "application/json",
              success: function(data, status, jqXHR) {
                  console.log(jqXHR);
                  console.log("success");
                  app.fetch();
              },

              error: function(jqXHR) {
                  console.log(jqXHR);
                  console.log('failure');
              }
          });
      },


      addMessage: function(chat) {
        $('#chats').prepend("<div>" +"<span class='username'>" + chat.username + "</span>" + ": " + chat.text + "</div>");
        $('#message').val('');
      },

      clearMessages: function() {
        $("#chats").html('');
      },

      addFriend: function() {

        }
      
       

  }

  $('#send').on( 'submit', function (e) {
    e.preventDefault();
    app.handleSubmit();
  });
  
  $("#removeMessages").on( "click", function (e) {
    e.preventDefault();
    app.clearMessages();
  });

  $('#room').change( function() {
      app.clearMessages();
      app.fetch();
    })

  $('#addRoom').on("click", function() {
    var newRoom = prompt("Name your room","");
    $('#room').append("<option value =" + newRoom.toString() +">" + newRoom + "</option>");
    $('#room').val(newRoom.toString());
    app.clearMessages();
    app.fetch();
  });

 // $('span').click(function () {console.log($(this).html())})
 //  });
// $('.username:contains("Will")')


app.init();

});

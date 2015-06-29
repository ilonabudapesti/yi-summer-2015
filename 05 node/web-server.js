// var so it's not global
var http = require('http');

  setInterval(function(){
    console.log("fetching google.com");

    http.get({ host: 'google.com' }, function(res) {
      console.log(res.headers);
    });
  }, 10000);

// call the server s
var s = http.createServer(function(req, res) {
  res.writeHead(200, { 'content-type': 'text/plain' });
  res.write("hello\n");
  setTimeout(function(){
    res.write("illy\n");
  }, 2000);
});

// bind to a port
s.listen(8000);
// var so it's not global
var http = require('http');

// call the server s
var s = http.createServer(function(req, res) {
  res.writeHead(200, { 'content-type': 'text/plain' });
  res.write("hello\n");
  setTimeout(function(){
    res.end("illy\n");
  }, 2000);
});

// bind to a port
s.listen(8000);
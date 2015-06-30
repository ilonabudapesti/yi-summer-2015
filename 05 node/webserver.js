var http = require('http');
http.createServer(function(req, res) {
  res.writeHead(200, { 'content-type': 'text/plain' });
  res.write("hello brendan, will, john and illy\n");
  res.end();
}).listen(8000);

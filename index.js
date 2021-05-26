const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 8080;

http.createServer(function (request, response) {
  if(!/^\/(public|favicon.ico$)/.test(request.url)){
    response.writeHead(400);
    response.end(JSON.stringify({message: 'not authorised'}));
    return;
  }
  fs.readFile(__dirname + request.url, function (err, data) {
    if (err) {
      response.writeHead(404);
      response.end(JSON.stringify(err));
      return;
    }
    const path = request.url.split(".");
    const extension = path[path.length - 1];
    const contentTypes = {
      html: "text/html",
      css: "text/css",
      js: "text/javascript"
    };
    const headers = {
      "Content-Type": contentTypes[extension]
    };
    response.writeHead(200, headers);
    response.end(data);
  });
}).listen(port);

console.log(`Server running at http://localhost:${port}`);
const url = require('url');
const http = require('http');
const app = http.createServer( function(request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('yeet');
    response.end();
});

app.listen(3000);
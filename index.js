const url = require('url');
const http = require('http');
const express = require('express');
const app = new express();


const web = http.createServer( function(request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('yeet');
    response.end();
});
app.get('/', function(request, response){
    response.sendFile('./frontend/index.html');
});


web.listen(process.env.PORT || 8888);
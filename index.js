const url = require('url');
const http = require('http');
const express = require('express');
var path = require('path');
const app = new express();


const server = app.listen(process.env.PORT || 8888, () => {
    app.get('/', function(request, response){
        response.sendFile(path.dirname(require.main.filename)+'frontend/index.html');
    });
});



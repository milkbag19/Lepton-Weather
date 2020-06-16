const url = require('url');
const http = require('http');
const express = require('express');
const app = new express();


const server = app.listen(process.env.PORT || 8888, () => {
    app.get('/', function(request, response){
        response.sendFile('./frontend/index.html');
    });
});



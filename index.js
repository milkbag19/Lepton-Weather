const url = require('url');
const http = require('http');
const express = require('express');
var path = require('path');
const app = new express();


const server = app.listen(process.env.PORT || 8888, () => {
    app.get('/', function(request, response){
        console.log(__dirname);
        //response.sendFile('app/frontend/index.html');
    });
});



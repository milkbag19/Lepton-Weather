const url = require('url');
const http = require('http');
const express = require('express');
const app = new express();


const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});
app.get('/', function(request, response){
    response.sendFile('./frontend/index.html');
});


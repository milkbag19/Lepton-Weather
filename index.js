const url = require('url');
const http = require('http');
const express = require('express');
var path = require('path');
const app = new express();

app.get('/', function(request, response){
    console.log(__dirname);
    response.sendFile('/app/frontend/index.html');
});

const server = app.listen(process.env.PORT || 8888, () => {
    app.use(express.urlencoded());

    app.post('/submit-form', (req, res) => {
        const username = req.body.username

        res.end()
    });
});



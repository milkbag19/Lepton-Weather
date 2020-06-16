const url = require('url');
const http = require('http');
const express = require('express');
var path = require('path');
const app = new express();
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

app.get('/', function(request, response){
    console.log(__dirname);
    response.sendFile('/app/frontend/index.html');
});

const server = app.listen(process.env.PORT || 8888, () => {
    app.use(express.urlencoded({extended: false}));

    app.post('/', (req, res) => {
        const username = req.body.username;
        res.write(username);
        res.write(app.get('/', function(request, response){
            console.log(__dirname);
            response.sendFile('/app/frontend/index.html');
        }));
        res.end();
    });
});



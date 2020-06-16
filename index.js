const url = require('url');
const http = require('http');
const express = require('express');
var path = require('path');
const app = new express();
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get('/', function(req, res){
    res.render('form');// if jade
    // You should use one of line depending on type of frontend you are with
    res.sendFile("/app/frontend/index.html"); //if html file is within public directory
});

app.post('/',function(req,res){
    var username = req.body.username;
    var htmlData = 'Hello:' + username;
    res.send(htmlData);
    console.log(htmlData);
});

app.listen(process.env.PORT || 8888);
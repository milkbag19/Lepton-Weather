var mysql = require('mysql');
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection
({
    host     : 'ftp.digiterahost.com',
    user     : 'leadfeas_bruh',
    password : 'JHTygzziLso3',
    database : 'leadfeas_node'
});

app.use(session({
    secret: 'kj4h35b3487ytvedihb9832h',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {
    var username = req.body.username;
    var password = req.body.password;
    if(username && password){
        var query = mysql.query("SELECT * FROM `users` WHERE username = ? AND password = ?", [username, password], function(err, results, fields){
            if(results.length > 0){
                request.session.user_id = results.user_id;
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please fill in both fields');
    }
    response.end();
});
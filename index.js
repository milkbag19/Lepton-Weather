var mysql = require('mysql');
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');//gg

var connection = mysql.createConnection
({
    host     : 'ftp.digiterahost.com',
    user     : 'leadfeas_bruh',
    password : 'JHTygzziLso3',
    database : 'leadfeas_node'
});

app.use(session({
    cookie:{
        secure: true,
        maxAge:60000
    },
    secret: '5b6435iuybh873bgf347vb939g',
    saveUninitialized: true,
    resave: false
}));
app.use(function(req,res,next){
    if(!req.session){
        return next(new Error('Oh no')) //handle error
    }
    next() //otherwise continue
});
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
app.get('/home', function(request, response) {
    if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});

app.listen(process.env.PORT || 3000);
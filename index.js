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

app.post('/auth', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if(username && password){
        var query = connection.query("SELECT * FROM `users` WHERE username = ? AND password = ?", [username, password], function(err, results, fields){
            if(results.length > 0){
                req.session.user_id = results.user_id;
                response.redirect('/home');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please fill in both fields');
    }
    res.end();
});
app.get('/home', function(request, response) {
    if (request.session.user_id) {
        response.send('Welcome back, ' + request.session.username + '!');
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
});

app.listen(process.env.PORT || 3000);
var mysql = require('mysql');
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');//gg
var cookieParser = require('cookie-parser');


// Creating a connection to our mysql database
var connection = mysql.createConnection
({
    host     : 'us-cdbr-east-02.cleardb.com',
    user     : 'bc7ebb91ba7af7',
    password : 'e005b7aa',
    database : 'heroku_4a764fc9b5fb4a4'
});
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.get('/', function(req, res) {
    if(req.session.user_id != null && req.session.user_id != ""){
        console.log(req.session.user_id);
        res.render('pages/index', {});
    } else {
        res.render('pages/login', {});
    }
});

// will listen to post requests in the /auth directory
app.post('/auth', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if(username && password){
        var query = connection.query("SELECT * FROM `users` WHERE username = ? AND password = ?", [username, password], function(err, results, fields){
            if (err) {
                return console.error('error: ' + err.message);
            }
            if(results.length > 0){
                req.session.user_id = results[0].id;
                console.log(results[0].id);
                res.writeHead(302, {
                    'Location': '/home'
                    //add other headers here...
                });
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please fill in both fields');
    }
});
// will listen to post requests in the /home directory
app.get('/home', function(request, response) {
    if (request.session.user_id) {
        response.render('pages/index', {});
        console.log(request.session.user_id);
    } else {
        response.send('Please login to view this page!');
        console.log(request.session.user_id);
    }
    response.end();
});

app.listen(process.env.PORT || 3000);
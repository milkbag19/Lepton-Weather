var mysql = require('mysql');
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
const config = require("./includes/config.js");
const weather = require("weather-js");

function toStandardTime(militaryTime) {
    militaryTime = militaryTime.split(':');
    return (militaryTime[0].charAt(0) == 1 && militaryTime[0].charAt(1) > 2) ? (militaryTime[0] - 12) + ':' + militaryTime[1] + ' P.M.' : militaryTime.join(':') + ' A.M.'
}
// Creating a connection to our mysql database
var connection = mysql.createConnection
({
    host     : config.db_host,
    user     : config.db_user,
    password : config.db_pass,
    database : config.db_name
});
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.get('/', function(req, res) {
    if(req.session.user_id != null){
        console.log(req.session.user_id);
        res.render('pages/index', {});
    } else {
        res.render('pages/login', {});
    }
});
setInterval(function () {
    connection.query('SELECT 1');
}, 5000);

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
               // console.log(results[0].id);
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
    if (request.session.user_id != null) {
        response.render('pages/index', {});
        console.log(request.session.user_id);
    } else {
        response.send('Please login to view this page!');
        console.log(request.session.user_id);
    }
    response.end();
});
app.locals.temp = '';
app.post('/results', function (req,res) {
    var local = req.body.location;
    weather.find({search: local, degreeType: 'C'}, function (err, result) {
        if (err) {
        } else if (result.length == 0) {
            return;
        }

        var current = result[0].current;
        var location = result[0].location;
        var forecast_high = [];
        var forecast_days = [];
        var forecast_low = [];
        var forecast = result[0].forecast;

        console.log(forecast);

        forecast.forEach(function(item, index){
            forecast_high.push(item.high);
            forecast_low.push(item.low);
            forecast_days.push(item.shortday);
        });

        app.locals.forecast_low = forecast_low;
        app.locals.forecast_high = forecast_high;
        app.locals.forecast_days = forecast_days;
        app.locals.temp = current.temperature;
        app.locals.observationtime = toStandardTime(current.observationtime);
        app.locals.day = current.day;
        app.locals.windspeed = current.windspeed;
        app.locals.feelslike = current.feelslike;
        app.locals.humidity = current.humidity;
        app.locals.cloudy_image = current.imageUrl;
        app.locals.location = location.name;
        res.writeHead(302, {
            'Location': '/home'
            //add other headers here...
        });
        res.end();
    });
});

app.listen(process.env.PORT || 3000);
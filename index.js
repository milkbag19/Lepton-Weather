const url = require('url');
const http = require('http');
const express = require('express');
var path = require('path');
const ejs = require('ejs');
const bodyParser = require("body-parser");
const app = new express();
const router = express.Router();



router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//parses request body and populates request.body
    app.use( express.bodyParser() );

//checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

//perform route lookup based on url and HTTP method
    app.use( app.router );

//Where to serve static content
    app.use( express.static( path.join( application_root, 'site') ) );

//Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));



router.get('/',(req, res) => {
    res.sendfile("/app/frontend/index.html");
});

router.post('/index',(req, res) => {
    var user_name=req.body.user;
    var password=req.body.password;
    console.log(user_name);
    res.end("yes");
});

app.listen(process.env.PORT || 8888,() => {
    console.log("Started on PORT 3000");
})


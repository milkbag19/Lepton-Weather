const url = require('url');
const http = require('http');
const express = require('express');
var path = require('path');
const ejs = require('ejs');
const bodyParser = require("body-parser");
const app = new express();
const router = express.Router();
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));


router.get('/',(req, res) => {
    res.sendfile("/app/frontend/index.html");
});

router.post('/index',(req, res) => {
    var user_name=req.body.user;
    var password=req.body.password;
    console.log("User name = "+user_name+", password is "+password);
    res.end("yes");
});

app.listen(process.env.PORT || 8888,() => {
    console.log("Started on PORT 3000");
})


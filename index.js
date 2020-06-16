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





app.listen(process.env.PORT || 8888,() => {
    app.get('/',(req, res) => {
        res.render("/app/index.ejs");
    });

    app.post('/',(req, res) => {
        var user_name=req.body.user;
        var password=req.body.password;
        console.log(user_name);
        res.end("yes");
    });
})


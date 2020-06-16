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
app.set('view engine', 'ejs');




app.listen(process.env.PORT || 8888,() => {
    app.get('/',(req, res) => {
        res.render("/app/index");
    });

    app.post('/',(req, res) => {
        res.end("yes");
    });
})


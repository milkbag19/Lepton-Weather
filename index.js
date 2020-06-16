const url = require('url');
const http = require('http');
const express = require('express');
var path = require('path');
const ejs = require('ejs');
const app = new express();
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

app.get('/', function(request, response){
    response.sendFile('/app/frontend/index.html');
});
app.use(express.urlencoded({extended: false}));

app.post('/', (req, res) => {
    const username = req.body.username;
    res.render('/app/frontend/index');
    res.write(username);
    res.end();
});
let people = ['geddy', 'neil', 'alex'],
    html = ejs.render('<%= people.join(", "); %>', {people: people});
// With jQuery:
const server = app.listen(process.env.PORT || 8888, () => {

});



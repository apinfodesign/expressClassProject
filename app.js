var express     = require('express');
var bodyParser 	= require('body-parser');
var router      = require('./router');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}) );
app.use('/',router);
app.use(function(req, res, next) {
    res.send('404, no page found: '+req.url);
});

//exporting express, which was first required here.
module.exports = app;
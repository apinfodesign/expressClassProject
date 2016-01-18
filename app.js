var express = require('express');   //takes module express

var router = require('./router');  //takes my module "router"

var app = express();

app.use('/',router);

app.use(function(req, res, next) {
    res.send('404, no page found: '+req.url);
});

//basically exporting express, which was first required here.
module.exports = app;
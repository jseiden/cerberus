var express = require('express');
var bodyParser = require('body-parser');
// var utils = require('utils/???');  

var app = express();

app.use(bodyParser.json());

app.get('/', function(req, res, next) {
  res.send('hi');
})

// routes go here

module.exports = app;


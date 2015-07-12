var express = require('express');
var bodyParser = require('body-parser');
var controller = require('./controller.js');

var app = express();

app.use(bodyParser.json());

app.get('/', controller.helloWorld);
app.get('/dummy', controller.sendDummyData);


module.exports = app;


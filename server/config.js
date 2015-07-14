var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var controller = require('./controller.js');



var app = express();

app.use(bodyParser.json());


//these routes are for TESTING ONLY 
app.get('/dummy', controller.sendDummyData);



app.get('/dbTestPopulate', controller.populate);
app.get('/testRequest', controller.mswRequest);

module.exports = app;


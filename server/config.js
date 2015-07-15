var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var controller = require('./controller.js');
var cors = require("cors");
var morgan = require("morgan");

var app = express();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

//these routes are for TESTING ONLY
app.get('/dbTestPopulate', controller.populate);
app.get('/testMswRequest', controller.mswRequest);
app.get('/dbData', controller.sendDbData);
app.get('/updateDb', controller.dbUpdate);
app.get('/test', controller.testSurfData);

module.exports = app;

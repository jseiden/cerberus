var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var ctlr = require('./controller.js');
var cors = require("cors");
var morgan = require("morgan");
var cron = require('node-schedule');

var app = express();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

//functions to be called on server init
ctlr.intervalRequest();

//these routes are for TESTING ONLY
app.get('/dbTestPopulate', ctlr.populate);
app.get('/testMswRequest', ctlr.mswRequest);
app.get('/dbData', ctlr.sendDbData);
app.get('/updateDb', ctlr.dbUpdate);
app.get('/test', ctlr.testSurfData);

module.exports = app;

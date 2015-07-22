var express = require('express');
var bodyParser = require('body-parser');
var cors = require("cors");
var morgan = require("morgan");
var controller = require('./controller.js');
var crudUtils = require('./utils/crudUtils.js');
var path = require('path');


var app = express();

//middleware
//app.use(cors());
//app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../../client'));

app.get('/', controller.sendIndex);
//these routes are for TESTING ONLY
app.get('/fetch', controller.sendSurfSpots);
//populates db with one-time beach data (e.g. lat/long, etc)

module.exports = app;

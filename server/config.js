var express = require('express');
var bodyParser = require('body-parser');
var controller = require('./controller.js');
var cors = require("cors");
var morgan = require("morgan");

var app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());


//these routes are for TESTING ONLY
app.get('/dummy', controller.sendDummyData);


app.get('/dbRetrieve', controller.retrieve);
app.get('/dbTestPopulate', controller.populate);

module.exports = app;

// node modules
var express = require('express');
var bodyParser = require('body-parser');
// local modules
var util = require('./utils.js');

var app = express();
app.use(bodyParser.json());

// routes
app.get('/', function (req, res) {
	console.log('----', req.body);
	res.send('hello world');
});

app.get('/dummy', util.sendDummyData);

module.exports = app;


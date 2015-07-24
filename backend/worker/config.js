var express = require('express');
var cron = require('node-schedule');

var apiUtils = require('./utils/apiUtils.js');
var crudUtils = require('./utils/crudUtils.js');

var app = express();

//apiUtils.getTweets(34.0300, 118.7500);

//apiUtils.tweets();
apiUtils.beachDataReq();


app.get('/writeBeachData', crudUtils.beachDataUpdate);
app.get('/requestBeachData', apiUtils.beachDataReq);

module.exports = app;

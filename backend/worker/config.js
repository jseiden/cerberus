var express = require('express');
var cron = require('node-schedule');

var apiUtils = require('./utils/apiUtils.js');
var crudUtils = require('./utils/crudUtils.js');

var app = express();


apiUtils.tweets();
//apiUtils.beachDataReq();


app.get('/writeBeachData', crudUtils.beachDataUpdate);
app.get('/requestBeachData', apiUtils.beachDataReq);

module.exports = app;

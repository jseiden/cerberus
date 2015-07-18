var express = require('express');
var cron = require('node-schedule');
var apiUtils = require('./utils/apiUtils.js');
var crudUtils = require('./utils/crudUtils.js');



var app = express();

//utils to be called on server init
apiUtils.updateBeachData();


app.get('/writeBeachData', crudUtils.beachDataUpdate);
app.get('/requestBeachData', apiUtils.beachDataReqs);



module.exports = app;

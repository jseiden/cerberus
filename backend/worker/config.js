var express = require('express');
var cron = require('node-schedule');

var apiUtils = require('./utils/apiUtils.js');
var crudUtils = require('./utils/crudUtils.js');
var spotData = require('./utils/json/beachData.json');

var app = express();

//enable the below util if you want initial spot data to be written
//crudUtils.writeBeachEntries(spotData);

//enable the below util if you want tweets to popualte
//apiUtils.tweetData();

//enable the below util if you want interval surf data updates
//apiUtils.mswData();

//enable the below util if you to populate DB with scraped descriptions
//apiUtils.mswDescriptions();

module.exports = app;

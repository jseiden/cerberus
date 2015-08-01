var express = require('express');
var cron = require('node-schedule');

var apiUtils = require('./utils/apiUtils.js');
var crudUtils = require('./utils/crudUtils.js');

var app = express();

var bootTasks = [
  crudUtils.writeBeachEntries,
  apiUtils.mswDescriptions,
  apiUtils.mswData,
  apiUtils.updateBeachData
];

function init(tasks, callback) {
  (function executeTask(i) {
    console.log(i, 'task invoked');
    if (i === tasks.length) {
      callback('~~~~Successfully initialized database and scheduled chron~~~');
      return;
    }
    tasks[i](function(msg) {
      console.log(msg);
      console.log(tasks[i].toString(), 'complete');
      executeTask(++i);
    });
  }).call(this, 0);
}

crudUtils.retrieveBeachData(function(results) {
  if(results.length === 0) {
    console.log('Worker initialized with no db.. running boot sequence');
    init(bootTasks, function(msg) {
      console.log(msg);
    });
  } else {
    console.log(results);
    console.log('worker initialized with db populated');
    bootTasks[bootTasks.length - 1](function (msg) {
      console.log(msg);
    });
  }
});

// enable the below function if you want to initially populate the database with scraped beaches
// crudUtils.writeBeachEntries();

// enable the below function if you want tweets to popualte
// apiUtils.tweetData();

// enable the below function if you want interval surf data updates
// apiUtils.mswData();

// enable the below function if you to populate DB with scraped descriptions
// apiUtils.mswDescriptions();


// app.get('/requestBeachData', apiUtils.beachDataReq);

module.exports = app;

var request = require('request');
var rp = require('request-promise');
var cron = require('node-schedule');

var spotData = require('./json/beachData.json');
var crudUtils = require('./crudUtils');

exports.beachDataReq = function(id, cb){
  var failed = [];
  // var endpoint = 'http://magicseaweed.com/api/436cadbb6caccea6e366ed1bf3640257/forecast/?spot_id=' + id.toString();
  var endpoint = 'http://magicseaweed.com/api/436cadbb6caccea6e366ed1bf3640257/forecast/?spot_id=' + id.toString();
  var options = {
    method: 'GET', 
    uri: endpoint
  };

  rp(options)
  //this idealy should not be a callback...should chain in promise format
    .then(function(data){
      cb(data)
    })
    .catch(function(){
      failed.push(id);
    })

  console.log(failed);
};


// exports.beachDataReqs = function(){   
//   spotData.forEach(function(ids){
//     var id = ids.mswId;
//     exports.beachDataReq(id, function(surfData){
//      crudUtils.beachDatumUpdate(id, surfData);
//     })
//   })
// };

// prototype version
//needs to be MAJORLY refactored...callback hell :(
exports.beachDataReqs = function() {   
  spotData.forEach(function(ids) {
    var id = ids.mswId;
    exports.beachDataReq(id, function(surfData){
      var timeFiltered = crudUtils.filterBeachDataTime(surfData);
      crudUtils.beachDatumUpdate(id, timeFiltered);
    })
  })
};


exports.updateBeachData = function(){
  var rule = new cron.RecurrenceRule();
  rule.minute = 30;
  cron.scheduleJob(rule, function(){
    // "export.beachDataRequests"
  });                                               
};

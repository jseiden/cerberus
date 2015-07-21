var request = require('request');
var rp = require('request-promise');
var cron = require('node-schedule');
var _ = require('underscore');
var Promise = require('bluebird');
var Twitter = require('twitter');

var spotData = require('./json/beachData.json');
var crudUtils = require('./crudUtils');

exports.beachDataReq = function(){

  var ids = spotData.map(function(beachData){
    return beachData.mswId
  });

  var recurseCall = function(ind){
    if (ind === ids.length-1) return;

    var id = ids[ind];

    var endpoint = 'http://magicseaweed.com/api/436cadbb6caccea6e366ed1bf3640257/forecast/?spot_id=' + id.toString();
    var options = {
      method: 'GET', 
      uri: endpoint
    };

    rp(options)
      .then(function(response){
        console.log('passed: ', id);
        var timeFiltered = crudUtils.filterBeachDataTime(response);
        crudUtils.beachDatumUpdate(id, timeFiltered);
        recurseCall(ind + 1)
      })
      .catch(function(error){
        console.log(error);
      });
  };

  recurseCall(0);
};

exports.updateBeachData = function(){
  var rule = new cron.RecurrenceRule();
  rule.hour = new cron.Range(0, 23, 3);
  cron.scheduleJob(rule, function(){
    exports.beachDataReq();
  });                                               
};


 
 
exports.getTweets = function(){ 

  var client = new Twitter({
   consumer_key: 'o9odfZmdeKbvrgpCVLotcPCNE',
   consumer_secret: 'siz3xPWBJ1iS14KPmSajdIn6DDmHjxHO7vBYr1fIt9E7XvgRrL',
   access_token_key: '874702442-UH5dCPdQ2tyl6NiqbwPFhyzsFNOYbFDdzQiuC0ar',
   access_token_secret: 'QLDf9QCxUzMxD7FkXMkTDKSmM5bB3Fe3ypvbw4Gq1GpAv'
  });

 client.stream('statuses/filter', {track: 'stinson beach'}, function(stream){
   stream.on('data', function(tweet){
    console.log('data received');
     console.log(tweet)
   });

   stream.on('error', function(error){
    console.log('error encountered')
    throw error;
   });
 });

}();

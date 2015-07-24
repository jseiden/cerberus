var request = require('request');
var rp = require('request-promise');
var cron = require('node-schedule');
var _ = require('underscore');
var Promise = require('bluebird');
var Twitter = require('twitter');

var spotData = require('./json/beachData.json');
var crudUtils = require('./crudUtils');
var Beach = require('../../db/models/beach.js');

exports.beachDataReq = function(){

  var ids = spotData.map(function(beachData){
    return beachData.mswId
  });

  var recurseCall = function(ind){
    if (ind === ids.length) return;

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
}

exports.updateBeachData = function(){
  var rule = new cron.RecurrenceRule();
  rule.hour = new cron.Range(0, 23, 3);
  cron.scheduleJob(rule, function(){
    exports.beachDataReq();
  });                                               
};

var getTweets = function(lat, lon, cb){ 

  var client = new Twitter({
   consumer_key: 'o9odfZmdeKbvrgpCVLotcPCNE',
   consumer_secret: 'siz3xPWBJ1iS14KPmSajdIn6DDmHjxHO7vBYr1fIt9E7XvgRrL',
   access_token_key: '874702442-UH5dCPdQ2tyl6NiqbwPFhyzsFNOYbFDdzQiuC0ar',
   access_token_secret: 'QLDf9QCxUzMxD7FkXMkTDKSmM5bB3Fe3ypvbw4Gq1GpAv'
  });

  var geocode = lat + "," + lon + ",5mi";
  //e.g. '34.0300,-118.7500,1mi'

  client.get('search/tweets', {q: 'surf', geocode: geocode}, function(error, tweets, response){
    cb(error, tweets);
    //console.log(tweets);
  });
};

var getTweetsAsync = Promise.promisify(getTweets);



exports.tweets = function(){

  var getTweetText = function(obj){
    return _.map(obj.statuses, function(tweet){
      return tweet.text;
    })
  };

  Beach.find({})
    .then(function(data){
      (function recurse(ind){
        if (ind === data.length-1) return;
        var beach = data[ind];
        getTweetsAsync(beach.lat, beach.lon)
          .then(function(tweets){
            var tweetText = getTweetText(tweets);
            crudUtils.writeTweets(tweetText, beach.mswId);
          })
        setTimeout( function(){recurse(ind+1)}, 60010);
      })(0)
    })
};





////////////////////////////EXPERIMENTAL//////////////////////////

//api key
//a4c78a3d-49e6-4372-a97f-3e424d517ab9


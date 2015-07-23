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

var getTweetText = function(obj){
  return _.map(obj.statuses, function(tweet){
    return tweet.text;
  })
};

// exports.tweets = function(){
//   var time = 60010;

//   Beach.find({})
//     .then(function(data){

//       function recurse(ind){
//         if (ind === data.length-1) return;
//         var lat = data[ind].lat;
//         var lon = data[ind].lon;
//         var id = data[ind].mswId;
//         //console.log('test');
//         getTweets(lat, lon, function(tweets){
//           var tweet = getTweetText(tweets);
//           crudUtils.writeTweets(tweet, id);
//         });
//         setTimeout( function(){recurse(ind+1)}, time);
//       }
//       recurse(0);
//     })
// };

var getTweetsAsync = Promise.promisify(getTweets);

exports.tweets = function(){
  var time = 60010;

  Beach.find({})
    .then(function(data){

      function recurse(ind){
        if (ind === data.length-1) return;
        var lat = data[ind].lat;
        var lon = data[ind].lon;
        var id = data[ind].mswId;
        getTweetsAsync(lat, lon)
          .then(function(tweets){
            var tweetText = getTweetText(tweets);
            console.log(tweetText);
            crudUtils.writeTweets(tweetText, id);
          })
        setTimeout( function(){recurse(ind+1)}, time);
      }
      recurse(0);
    })
};

exports.tweets();




////////////////////////////EXPERIMENTAL//////////////////////////
// var promisedTwitter = Promise.promisify(exports.getTweets);



// getTweetsAsync(34.0300, 118.7500)
//   .then(function(tweet){
//     console.log('---------', tweet);
// });

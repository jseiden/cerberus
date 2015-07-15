var request = require('request');
var cron = require('node-schedule');

var testData = require('./utils/testData.js');
var db = require('./db//mongodb-data/config.js');
var Beach = require('./db/models/beach.js');
var spotData = require('./utils/json/locationsWithCoords.json');




exports.sendDbData = function (req, res) {
  	Beach.find({}, function(err, data){
  		res.send(data);
  	})
};

exports.createEntry = function(req, res, data){
  	var newBeach = Beach({
			mswId: data.mswId,
			beachname: data.beachName,
			lat: data.lat,
			lon: data.lon,
			forecastData: ['justin puts the lotion on its skin']
		});

		newBeach.save(function(err){
			if (err) throw err;
			console.log('Beach Entry Created!')
		});
};

exports.populate = function(req, res){
	for (var i=0; i<spotData.length; i++){
		exports.createEntry(req, res, spotData[i]);
	}
};

exports.testSurfData = function(){   
  console.log('run'); 
  spotData.forEach(function(ids){
    var id = ids.mswId;
    exports.mswRequest(id, function(surfData){
      exports.dbUpdate(id, surfData)
    });
  })
};

exports.dbUpdate = function(id, data){
  Beach.findOneAndUpdate({mswId: id}, {forecastData: data}, function(err, beach){
    if (err) throw err;
   // console.log('db: ', beach);
  })
};

exports.mswRequest = function(id, cb){
	var endpoint = 'http://magicseaweed.com/api/436cadbb6caccea6e366ed1bf3640257/forecast/?spot_id=' + id.toString();
	request({
    method: 'GET', 
    uri: endpoint
  },
  function (error, response, body){
    if (error){
      return console.log('request failed: ', error);
    }
    cb(body)
  })
};

exports.intervalRequest = function(){
  var rule = new cron.RecurrenceRule();
  rule.second = 30;
  cron.scheduleJob(rule, function(){
    console.log('The answer to life...');
    //will eventually be exports.mswRequest
  });
}




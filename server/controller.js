var request = require('request');
var testData = require('./utils/testData.js');
var db = require('./db//mongodb-data/config.js');
var Beach = require('./db/models/beach.js');
var spotData = require('./utils/json/locationsWithCoords.json');
var path = require('path');

  sendDbData: function (req, res) {
  	Beach.find({}, function(err, data){
  		res.send(data);
  	})
  },

  createEntry: function(req, res, data){
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
  },

  populate: function(req, res){
  	for (var i=0; i<spotData.length; i++){
  		module.exports.createEntry(req, res, spotData[i]);
  	}
  },

  mswRequest: function(req, res){
  	var endpoint = 'http://magicseaweed.com/api/436cadbb6caccea6e366ed1bf3640257/forecast/?spot_id=10'
  	request
  		.get(endpoint)
  		.on('error', function(err){
  			console.log(err);
  		})
  		.on('response', function(response){
  			console.log(response.statusCode);
  		})
  },

  sendIndex: function (req, res) {
    res.sendFile(path.join(__dirname, '../client/html/', 'index.html'));
  }

}


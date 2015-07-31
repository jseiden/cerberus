var _ = require('underscore');

var db = require('../../db/mongodb-data/config.js');
var Beach = require('../../db/models/beach.js');
var apiUtils = require('./apiUtils.js');
var spotData = require('./json/beachData.json');
var Promise = require('bluebird');

var writeBeachEntry = Promise.promisify (function(beachData, cb){
	Beach.find({mswId: beachData.mswId})
		.then(function(beach){
			if (beach.length === 0){
				return new Beach({
					mswId: beachData.mswId,
					beachname: beachData.beachName,
					lat: beachData.lat,
					lon: beachData.lon,
					description: 'this is a beach',
					tweets: ['test'],
					forecastData: ['test']
				})
			}
		})
		.then(function(newBeach){
			console.log(newBeach);
			return newBeach.save()
		})
		.then(function(err, success){
			console.log('run');
			cb(success, err)
		})
		.catch(function(err){
			console.log(err)
		})
})
	
exports.writeBeachEntries = function(beachData){
		(function recurse(ind){
			console.log(ind);
			if (ind === beachData.length){
				console.log('All entries written');
				return;
			}
			writeBeachEntry(beachData[ind])
				.then(function(success){
					console.log("success");
					recurse(++ind)
				})
				.catch(function(err){
					console.log(err)
				})
		})(0)
};

exports.retrieveBeachData = function (cb) {
  Beach.find({})
  	.then(function(data){
  		cb(data);
  	})
};

exports.filterBeachDataTime = function(data){
	var parsedData = JSON.parse(data);
	var time = Math.floor( (Date.now()/1000) );
	return _.filter(parsedData, function(datum){
		return datum.localTimestamp > time && datum.localTimestamp < (time + 86402);
	});
};


//node modules
var Twitter = require('twitter');

//local modules
var resources = require('./resources.js');
var Surf = require('./db/models/surf.js');

//util functions
exports.sendDummyData = function(req, res){
	res.json(resources.dummyData);
};

//this util will write to DB will eventually be moved to worker
//could also be used in future if client needs to store persistent data

//createDB will initialize with dynamically supplied data (perhaps from another util)
//hard coded data is only for test (ideally would be pulling data from testData.js)

exports.createDB = function(){

	var newSurf = Surf({
		mswId: 123,
		beachname: 'Stinson Beach',
		lat: '37.91333°N',
		lon: '122.54833°W',
		forecastData: 'Test Conditions'
	});

	newSurf.save(function(err){
		if (err) throw err;
		console.log('surfData Created!')
	});

};

exports.retrieveDB = function(){

};

exports.updateDB = function(){

};






exports.parseBeachData = function(req, res){

}


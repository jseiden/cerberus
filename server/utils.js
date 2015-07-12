
//node modules
var Twitter = require('twitter');

//local modules
var resources = require('./resources.js');

//util functions
exports.sendDummyData = function(req, res){
	res.json(resources.dummyData);
};

exports.retrieveData = function(req, res){

}


//this util will write to DB
//will eventually be moved to worker
//could also be used in future
//if client needs to store persistent data
exports.writeData = function(req, res){

}

exports.parseBeachData = function(req, res){

}


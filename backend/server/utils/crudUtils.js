var db = require('../../db/mongodb-data/config.js');
var Beach = require('../../db/models/beach.js');

exports.retrieveAllBeachData = function (cb) {
  Beach.find({})
  	.then(function(data){
  		cb(data);
  	})
};



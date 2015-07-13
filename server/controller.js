var testData = require('./utils/testData.js');
var db = require('./db/config.js');
var Beach = require('./db/models/beach.js');
var spotData = require('./utils/spotIdToName.json');

module.exports = {

  sendDummyData: function (req, res) {
  	res.json(testData.dummyData);
  },

  helloWorld: function (req, res) {
    res.send('Hello World');
  },

  //this util will write to DB will eventually be moved to worker
	//could also be used in future if client needs to store persistent data
	//hard coded data is only for test (ideally would be pulling data from testData.js)


  createDB: function(req, res){
  	var newBeach = Beach({
			mswId: 123,
			beachname: 'Stinson Beach',
			lat: '37.91333°N',
			lon: '122.54833°W',
			forecastData: 'Test Conditions'
		});

		newBeach.save(function(err){
			if (err) throw err;
			console.log('surfData Created!')
			res.send('surfData Created')
		});
  },

  testJSON: function(req, res){
  	console.log(spotData);
  },
  /*

  spotIdToName.json

  for (var items in spots){
		
  }
		oneTimePopulate: function(req, res){
			var newBeach = Beach({
				mswId: id
			})
		}
  */
  

  //retrieveDB will eventually retrieve dynamically from util and/or arguments
	//for now hard coded retrieve is used for testing (ideally would be pulling data from testData.js)
  retrieveDB: function(req, res){
  	Beach.find({}, function(err, data){
  		console.log(data);
  		res.send(data);
  	})
  },

  updateDB: function(){

  }

}

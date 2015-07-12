var testData = require('./utils/testData.js');
var db = require('./db/config.js');
var Surf = require('./db/models/surf.js');

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
  },
  

  //retrieveDB will eventually retrieve dynamically from util and/or arguments
	//for now hard coded retrieve is used for testing (ideally would be pulling data from testData.js)
  retrieveDB: function(req, res){
  	Surf.find({}, function(err, data){
  		console.log(data);
  		res.send(data);
  	})
  },

  updateDB: function(){

  }

}

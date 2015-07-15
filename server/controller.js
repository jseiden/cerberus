var request = require('request');
var testData = require('./utils/testData.js');
var db = require('./db//mongodb-data/config.js');
var Beach = require('./db/models/beach.js');
var spotData = require('./utils/json/locationsWithCoords.json');

module.exports = {

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

  testSurfData: function(){    

    //WEIRDNESS FOLLOWS --> 
    // for (var i=0; i<spotData.length; i++){
    //   var id = spotData[i]['mswId'];
    //   console.log(id);
    //   module.exports.mswRequest(id, function(surfData){
    //     //module.exports.dbUpdate(id, surfData)
    //     console.log('----', thatId)
    //   });
    // }

    spotData.forEach(function(ids){
      var id = ids.mswId;
      module.exports.mswRequest(id, function(surfData){
        module.exports.dbUpdate(id, surfData)
      });
    })
  },

  dbUpdate: function(id, data){
    Beach.findOneAndUpdate({mswId: id}, {forecastData: data}, function(err, beach){
      if (err) throw err;
      //console.log('db: ', beach);
    })
    // Beach.findOneAndUpdate({mswId: 162}, {forecastData: ['james puts the lotion on its skin']}, function(err, beach){
    //   if (err) throw err;
    //   console.log(beach);
    // })
  },

  mswRequest: function(id, cb){
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
  }

}


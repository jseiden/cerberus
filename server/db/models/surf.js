var mongoose = require('mongoose');

//define schema
var surfSchema = mongoose.Schema({
  mswId: Number,
  beachname: String,
  lat: String,
  lon: String,
  forecastData: Array
});

var Surf = mongoose.model('Surf', surfSchema)

//any methods to attach to data in Surf will be inserted below
//e.g. Surf.doSomethingWithData = function(){...}

module.exports = Surf;

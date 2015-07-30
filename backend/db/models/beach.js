var mongoose = require('mongoose');

//define schema
var beachSchema = mongoose.Schema({
  mswId: Number,
  beachname: String,
  lat: Number,
  lon: Number,
  forecastData: Array,
  description: String,
  tweets: Array
});

var Beach = mongoose.model('Beach', beachSchema);

//any methods to attach to data in Surf will be inserted below
//e.g. Surf.doSomethingWithData = function(){...}

module.exports = Beach;

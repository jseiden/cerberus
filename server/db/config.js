//nodem modules
var mongoose = require('mongoose');
//mongoose config
mongoURI = 'mongodb://localhost/thesis'
mongoose.connect(mongoURI);

//opens initial connection
//Run in seperate terminal window using " mongod --dbpath . " in "./db" directory
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('Mongodb connection open');
});

//exports db for use in other files
module.exports = db;


/*

db.once('open', function() {
  var beachSchema = new mongoose.Schema({
    mswId: Number,
    beachName: String,
    lat: String,
    lon: String,
    forecastData: Array
  });
  // TODO: Assuming we'll be expanding, figure out how to organize models
  var Beach = mongoose.model('Beach', beachSchema);
});

mongoose.connect('mongodb://localhost/thesis');
*/
var mongoose = require('mongoose');
db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  var beachSchema = new mongoose.Schema({
    mswId: Number,
    beachName: String,
    lat: String,
    lon: String,
    forecastData: {
      // TODO: Fill out with real surf data
    }
  });
  // TODO: Assuming we'll be expanding, figure out how to organize models
  var Beach = mongoose.model('Beach', beachSchema);
});

mongoose.connect('mongodb://localhost/thesis');

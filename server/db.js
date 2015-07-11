var mongoose = require('mongoose');
db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  var beachSchema = new mongoose.Schema({
    id: Number,
    lat: String,
    lon: String,
    beach: String,
    data: {
      // TODO: Fill out with real surf data
    }
  });
  var Beach = mongoose.model('Beach', beachSchema);
});

mongoose.connect('mongodb://localhost/thesis');

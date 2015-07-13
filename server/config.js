var express = require('express');
var bodyParser = require('body-parser');
var controller = require('./controller.js');



var app = express();

app.use(bodyParser.json());


//these routes are TBD
app.get('/', controller.helloWorld);
app.get('/dummy', controller.sendDummyData);


app.get('/dbInit', controller.createDB);
app.get('/dbRetrieve', controller.retrieveDB);

app.get('/testJSON', controller.testJSON);

module.exports = app;


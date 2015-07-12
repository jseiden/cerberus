var testData = require('./utils/testData.js');

module.exports = {

  sendDummyData: function (req, res) {
  	res.json(testData.dummyData);
  },

  helloWorld: function (req, res) {
    res.send('Hello World');
  }
  
}

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var http = require('http');

var beaches = require('./spotIdToName.json');
var geocoder = require('geocoder');
var rp = require('request-promise');

var url = 'http://maps.googleapis.com/maps/api/geocode/json?address=';
var key = '&key=AIzaSyBscDFufllGWrUo6O3WKRDHq7XtjcVfEx8';

// var getLatLon =
//   //Read spotIdToName
//   fs.readFileAsync('spotIdToName.json')
//     .then(function(data) {
//       var beachList = JSON.parse(data);
//       var savedBeach = JSON.parse(data);
//       for (var beachID in beachList) {
//         // Replace spaces with '_'
//         var newBeach = beachList[beachID].split(' ').join('_');
//         // add Beach California
//         beachList[beachID] = newBeach + '_Beach_California';
//       }
//       return {beachList: beachList, beachName: savedBeach};
//     })
//     .then(function(res) {
//       var beachList = res.beachList;
//       var name = res.beachName;
//       var beachKeys = Object.keys(beachList);
//       var newJSON = [];
//       //Create loop
//       var i = 0;
//       function setLoop () {
//         // Set timeout for 1 request a second
//         setTimeout(function () {
//           // Create new JSON object
//           var JSONobj = {
//             mswId: beachKeys[i],
//             beachName: name[beachKeys[i]],
//             lat: '',
//             lon: ''
//           };
//
//           rp(url + beachList[beachKeys[i]])
//           .then(function(results) {
//             var data = JSON.parse(results);
//             if (data.results.length) {
//               var latitude = data.results[0].geometry.location.lat;
//               var longitude = data.results[0].geometry.location.lng;
//             }
//             JSONobj.lat = latitude || 'ZERO_RESULTS';
//             JSONobj.lon = longitude || 'ZERO_RESULTS';
//             console.log(JSONobj);
//             newJSON.push(JSONobj);
//           });
//
//           i++;
//           if (i <= beachKeys.length) {
//             setLoop();
//           }
//           else {
//             // Write to File
//             fs.writeFileAsync('latlonDOS.json', JSON.stringify(newJSON))
//             .then(function() {
//               console.log('Done creating latlon.json');
//             });
//           }
//
//         }, 1000)
//       }
//       setLoop();
//     });

// fs.readFileAsync('latlon.json')
// .then(function(data) {
//   var parsed = JSON.parse(data);
//   var total = parsed.length;
//   var noResults = 0;
//   var  i = 0;
//   var setLoop = function() {
//     setTimeout(function() {
//       if (parsed[i].lat === 'ZERO_RESULTS') {
//         var futureSearch = parsed[i].beachName.slice(0, -17) + '_California'
//         rp(url + futureSearch)
//         .then(function(data) {
//           console.log(data);
//           parsed[i].lat = data.results[0].geometry.location.lat;
//           parsed[i].lon = data.results[0].geometry.location.lng;
//           console.log(parsed[i]);
//         });
//
//       }
//       i++;
//       if (i <= total) {
//         setLoop();
//       }
//     }, 1000)
//   }
//   setLoop();

fs.readFileAsync('spotIdToName.json')
.then(function(data) {
  var parsed = JSON.parse(data);
  return parsed;
})
.then(function(scraped) {
  fs.readFileAsync('mswMap.json')
  .then(function(mapData) {
    var parsedMap = JSON.parse(mapData);
    for (var i = 0; i < parsedMap.length; i++) {
      var currentId = parsedMap[i]._id;
      var currentName = parsedMap[i].name;
      var currentLat = parsedMap[i].lat;
      var currentLon = parsedMap[i].lon;
      scraped[currentId] = {
        mswId: currentId,
        beachName: currentName,
        lat: currentLat,
        lon: currentLon
      };
    }
    console.log(scraped);
  })
});
  // for (var i = 0; i < parsed.length; i++) {
  //   if (parsed[i].lat === 'ZERO_RESULTS') {
  //
  //     console.log(futureSearch);
  //   }
  // }

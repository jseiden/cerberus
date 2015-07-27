var worker = require('../../worker/utils/apiUtils.js');
var crud = require('../../worker/utils/crudUtils.js');
var rp = require('request-promise');


var id = 4423;
var url = 'http://magicseaweed.com/api/436cadbb6caccea6e366ed1bf3640257/forecast/?spot_id=' + id;

function updateSingleBeach (id) {
  rp(url)
    .then(function (data) {
      console.log('successfully called', url);
      var timeFiltered = crud.filterBeachDataTime(data);
      console.log(timeFiltered);
      crud.beachDatumUpdate(id, timeFiltered);
    });
};
// updateSingleBeach(4423);
// worker.beachDataReq();
// crud.beachDataUpdate();
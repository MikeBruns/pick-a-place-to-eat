const request = require('request');
const config = require('../config.json');

var lat = 41.48754;
var lng = -82.10153689999999;

var placesNearHere = () => {
  request({
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=restaurant&key=${config.googleApiKey}`,
    json: true
  }, (error, response, body) => {
    console.log(JSON.stringify(body, undefined, 2));
  });
};

module.exports.placesNearHere = placesNearHere;

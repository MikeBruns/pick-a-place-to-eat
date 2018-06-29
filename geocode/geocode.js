const request = require('request');
const config = require('../config.json');

var geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${config.googleApiKey}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google service');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        lat: body.results[0].geometry.location.lat,
        lng: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;

// var googleMapsClient = require('@google/maps').createClient({
//   key: config.googleApiKey
// });
// googleMapsClient.geocode({
//   address: '44054'
// }, function(err, response) {
//   if (!err) {
//     console.log(response.json.results);
//   }
// });
const request = require('request');
const config = require('../config.json');

var lat = 41.48754;
var lng = -82.10153689999999;
// var lat = 41.8781; //chicago
// var lng = -87.62989;
var radiusInMeters = 50000;
// var radiusInMeters = 24140.16;
const googleMapsLocationUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
var placesNames = [];

var placesNearHere = (settings) => {
  request({
    url: `${googleMapsLocationUrl}${lat},${lng}&radius=${settings.radiusInMeters}&opennow&type=restaurant&key=${config.googleApiKey}`,
    json: true
  }, (error, response, body) => {
    // console.log(JSON.stringify(body, undefined, 2));
    getPlacesNearMeNames(body);
    if (body.next_page_token) {
      getNextPage(body.next_page_token);
    }
  });
};

var getPlacesNearMeNames = body => {
  console.log('...');
  // console.log(JSON.stringify(body, undefined, 2));
  for (var i = 0; body.results && i < body.results.length; i++) {
    placesNames.push(body.results[i].name);
  }
  // console.log(placesNames);
};

var getNextPage = nextPageToken => {
  setTimeout(() => {
    request({
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${config.googleApiKey}&pagetoken=${nextPageToken}`,
      json: true
    }, (error, response, body) => {
      console.log('...');
      for (var i = 0; i < body.results.length; i++) {
        placesNames.push(body.results[i].name);
      }
      if (body.next_page_token) {
        getNextPage(body.next_page_token)
      } else {
        // console.log('Final places list:');
        // console.log(placesNames);
        // console.log(placesNames.length);
        var theChosenOne = placesNames[Math.floor(Math.random() * placesNames.length)];
        console.log(`Looks like we are eating at... ${theChosenOne}`);
      }
    });
  }, 2000); //have to use a timeout to allow the next page work, it only works after it has been processed
};


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

module.exports.placesNearHere = placesNearHere;

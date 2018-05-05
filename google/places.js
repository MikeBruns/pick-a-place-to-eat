const request = require('request');
const config = require('../config.json');

var lat = 41.48754;
var lng = -82.10153689999999;
var radiusInMeters = 50000;
const googleMapsLocationUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
var placesNames = [];

var placesNearHere = (settings) => {
  request({
    url: `${googleMapsLocationUrl}${lat},${lng}&radius=${settings.radiusInMeters}&type=restaurant&key=${config.googleApiKey}`,
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
  // console.log(JSON.stringify(body, undefined, 2));
  for (var i = 0; body.results && i < body.results.length; i++) {
    placesNames.push(body.results[i].name);
  }
  console.log(placesNames);
};

var getNextPage = nextPageToken => {
  console.log(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${config.googleApiKey}`);
  setTimeout(() => {
    console.log('inside of callback');

    request({
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${config.googleApiKey}&pagetoken=${nextPageToken}`,
      json: true
    }, (error, response, body) => {
      console.log(body.results.length);
      console.log(body.results[1].name);
      for (var i = 0; i < body.results.length; i++) {
        placesNames.push(body.results[i].name);
      }
      console.log(placesNames);
      // console.log(JSON.stringify(body.results, undefined, 2));
      // getPlacesNearMeNames(body.results[1].prop[0]);
      // if (body.next_page_token) {
      //   getNextPage(body.next_page_token);
      // }
    });
  }, 2000);
};

module.exports.placesNearHere = placesNearHere;

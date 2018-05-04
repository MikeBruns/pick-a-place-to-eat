const request = require('request');
const config = require('../config.json');

var lat = 41.48754;
var lng = -82.10153689999999;
var radiusInMeters = 5000;
const googleMapsLocationUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';

var placesNearHere = (settings) => {
  request({
    url: `${googleMapsLocationUrl}${lat},${lng}&radius=${settings.radiusInMeters}&type=restaurant&key=${config.googleApiKey}`,
    json: true
  }, (error, response, body) => {
    // console.log(JSON.stringify(body, undefined, 2));
    getPlacesNearMeNames(body);
  });
};

var getPlacesNearMeNames = body => {
  let placesNames = [];
  for (var i = 0; i < body.results.length; i++) {
    placesNames.push(results[i].name);
  }
  while (body.next_page_token) {
    addPlacesToList(body.results, placesNames);
  }
  console.log(placesNames);
};

var addPlacesToList = (results, list) => {
  for (var i = 0; i < body.results.length; i++) {
    list.push(results[i].name);
  }
  return list;
};

var getNextPage = nextPageToken => {
  request({https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${config.googleApiKey}
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${config.googleApiKey}`,
    json: true
  }, (error, response, body) => {
    // console.log(JSON.stringify(body, undefined, 2));
    getPlacesNearMeNames(body.results);

  });
};

module.exports.placesNearHere = placesNearHere;

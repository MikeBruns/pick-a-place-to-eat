const request = require('request');
const config = require('../config.json');

const googleMapsLocationUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
var placesNames = [];

var placesNearHere = (settings) => {
  request({
    url: `${googleMapsLocationUrl}${settings.lat},${settings.lng}&radius=${settings.radiusInMeters}&opennow&type=restaurant&key=${config.googleApiKey}`,
    json: true
  }, (error, response, body) => {
    // console.log(JSON.stringify(body, undefined, 2));
    getPlacesNearMeNames(body);
    if (body.next_page_token) {
      getNextPage(body.next_page_token);
    } else {
      determineTheChosenOne();
    }
  });
};

var getPlacesNearMeNames = body => {
  console.log('We are searching for your feast...');
  for (var i = 0; body.results && i < body.results.length; i++) {
    placesNames.push(body.results[i].name);
  }
};

var getNextPage = nextPageToken => {
  setTimeout(() => {
    request({
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${config.googleApiKey}&pagetoken=${nextPageToken}`,
      json: true
    }, (error, response, body) => {
      console.log('Fetching more places to eat...');
      for (var i = 0; i < body.results.length; i++) {
        placesNames.push(body.results[i].name);
      }
      if (body.next_page_token) {
        getNextPage(body.next_page_token)
      } else {
        determineTheChosenOne();
      }
    });
  }, 2000); //have to use a timeout to allow the next page work, it only works after it has been processed
};

const determineTheChosenOne = () => {
  // console.log('Final places list:');
  // console.log(placesNames);
  // console.log(placesNames.length);
  if (placesNames.length > 0) {
    let theChosenOne = placesNames[Math.floor(Math.random() * placesNames.length)];
    console.log(`\nLooks like we are eating at... ${theChosenOne}`);
  } else {
    console.log('Hmm there were no results. Go make a sandwhich.');
  } 
}

module.exports.placesNearHere = placesNearHere;

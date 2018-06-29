const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const google = require('./google/places.js');

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: 'a',
      describe: 'Zip code or street address to fetch latitude and longitude',
      string: true
    },
    radius: {
      demand: false,
      alias: 'r',
      default: 50000,
      describe: 'Radius of food search',
      type: 'number'
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

console.log('Lets pick a place to eat...');

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    google.placesNearHere({
      lat: results.lat,
      lng: results.lng,
      radiusInMeters: argv.radius
    });
  }
});

// google.placesNearHere({
//   address: '44054',
//   radiusInMeters: 50000
// });

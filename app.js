const yargs = require('yargs');
const google = require('./google/places.js');

// const argv = yargs
//   .options({
//     address: {
//       demand: true,
//       alias: 'a',
//       describe: 'Address to fetch weather for',
//       string: true
//     }
//   })
//   .help()
//   .alias('help', 'h')
//   .argv;

google.placesNearHere();

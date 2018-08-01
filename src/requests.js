const request = require('request');
const fs = require('fs');
// the commented code was used to populate the cityList.json & countryList.json files.
// const url = 'https://api.openaq.org/v1/cities?limit=10000';
// const url = 'https://api.openaq.org/v1/countries?limit=10000';
// request(url, (err, res, body) => {
//   fs.writeFile('./src/countryList.json', body, (err) => {
//     if (err) {
//       console.log(err);
//     }
//   });
// });

// The code below was used to test the APIs searched by city function.
// const url = 'https://api.openaq.org/v1/latest?country=US&city=NEW%20YORK';
// request(url, (err, res, body) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(body);
//   }
// });

// The code below is used to get Air quality data using lat,long & radius .s

const cityHasData = (city, pollutants = ['pm10', 'no2', 'o3']) => {
  const tracker = [false, false, false];
  city.measurements.forEach((measure) => {
    if (pollutants.includes(measure.parameter)) {
      const index = pollutants.indexOf(measure.parameter);
      tracker[index] = true;
    }
  });
  return tracker === [true, true, true];
};

const pollutionDataRequest = (lat, long, cb, radius = 8000) => {
  const url = `https://api.openaq.org/v1/latest?coordinates=${lat},${long}&radius=${radius}`;
  request(url, (err, res, body) => {
    if (err) {
      console.log(err);
    } else {
      // We should check that the response is 200
      const cityArray = JSON.parse(body).results;
      const closestCity = cityArray.reduce((acc, city, index) => {
        // If acc is empty then take the first city
        if (index === 0) {
          return city;
          // Test if city has enough data for us and if it is closer than acc
        }
        if (cityHasData(city) && city.distance < acc.distance) {
          return city;
        }
        return acc;
      }, {});
      cb(closestCity);
    }
  });
};

module.exports = {
  pollutionDataRequest,
};

const citiesJSON = require('./city100k.json');

const includesSearch = (input, cities) => {
  const output = [];
  cities.forEach((city) => {
    if (city.name.toUpperCase().includes(input.toUpperCase())) {
      output.push(city);
    }
  });
  return output;
};

const citySearch = (input, cities = citiesJSON) => {
  // Finds any matches that contain the input
  const allMatches = includesSearch(input, cities);
  // Sorts matches, shorter matches are at the front. User typed cities will be prefered
  const sortedMatches = allMatches.sort((a, b) => a.name.length - b.name.length);
  // Cuts off all but top 4 cities
  const top8Matches = sortedMatches.slice(0, 4);
  return top8Matches;
};

module.exports = citySearch;

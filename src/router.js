const {
  homePage,
  pollutionDataHandler,
  assetsHandler,
  autocompleteHandler,
  notFound,
} = require('./handlers');

const assetURLs = [
  '/index.html',
  '/dom.js',
  '/style.css',
  '/xhr.js',
  '/supertest-500',
  '/background.js',
  '/weather.png',
  '/favicon.ico',
];
/* Router fn to deal with 4 requests - the homepage, an asset (e.g. CSS file),
a client data request and an else which produces a 404 page. These requests call
on functions in the handlers file to produce a response. */
const router = (request, response) => {
  const { url } = request;
  if (url === '/') {
    homePage(response);
  } else if (assetURLs.includes(url)) {
    assetsHandler(url, response);
  } else if (url.includes('/get-pollution-data')) {
    pollutionDataHandler(request, response);
  } else if (url.includes('/autocomplete-city')) {
    autocompleteHandler(request, response);
  } else {
    notFound(response);
  }
};

module.exports = router;

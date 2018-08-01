const handlers = require('./handlers');

const assetURLs = ['/index.html', '/dom.js', '/style.css', '/xhr.js', '/background.js'];
/* Router fn to deal with 4 requests - the homepage, an asset (e.g. CSS file),
a client data request and an else which produces a 404 page. These requests call
on functions in the handlers file to produce a response. */
const router = (request, response) => {
  const url = request.url;
  if (url === '/') {
    handlers.homePage(response);
  } else if (url.includes('/get-data')) {
    handlers.searchHandler(request, response);
  } else if (assetURLs.includes(url)) {
    handlers.assetsHandler(url, response);
  } else {
    handlers.notFound(response);
  }
};

module.exports = router;

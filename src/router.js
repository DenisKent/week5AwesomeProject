const handlers = require('./handlers');

/* Router fn to deal with 4 requests - the homepage, an asset (e.g. CSS file),
a client data request and an else which produces a 404 page. These requests call
on functions in the handlers file to produce a response. */

const router = (request, response) => {
  const url = request.url;
  if (url === '/') {
    handlers.homePage(response);
  } else if (url.indexOf('/getData?q=') === 0) {
    handlers.searchHandler(url, response);
  } else if (url.includes('style.css')) {
    handlers.assetsHandler(url, response);
  } else {
    handlers.notFound(response);
  }
};

module.exports = router;

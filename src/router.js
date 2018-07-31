const handlers = require('./handlers');

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

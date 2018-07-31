const handlers = require('./handlers');

const router = (request, response) => {
  const url = request.url;
  if (url === '/') {
    handlers.homePage(response);
  } else if (url.indexOf('/getData?q=') === 0) {
    handlers.search(url, response);
  } else if (url.indexOf('/') === 0) {
    handlers.assets(url, response);
  } else {
    handlers.notFound();
  }
};

module.exports = router;

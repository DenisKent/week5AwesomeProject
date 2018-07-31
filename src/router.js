const handlers = require('./handler.js');

function router(request, response) {
  const url = request.url;
  if (url === '/') {
    handlers.index(response);
  } else if (url.indexOf('/getData?q=') === 0) {
    handlers.search(url, response);
  } else if (url.indexOf('/') === 0) {
    handlers.assets(url, response);
  } else {
    handlers.notFound();
  }
}

module.exports = router;

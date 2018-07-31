const fs = require('fs');
const path = require('path');

/* Function to handle requests for the homePage and send back appropriate response */

const homePage = (response) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.end('<h1>Sorry, something went wrong</h1>');
    } else {
      response.writeHead(200, { 'Content-type': 'text/html' });
      response.end(file);
    }
  });
};

/* Function to handle requests for the assets e.g. css, images, javascript pages
and send back the appropriate response */

const assetsHandler = (url, response) => {
  const extension = url.split('.')[1];
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    jpg: 'image/jpeg',
    png: 'image/png',
    json: 'application/json',
  };
  const filePath = path.join(__dirname, '..', 'public', url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.end('<h1>sorry, something went wrong</h1>');
    } else {
      response.writeHead(200, { 'Content-Type': extensionType[extension] });
      response.end(file);
    }
  });
};

const searchHandler = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end('Hello');
};

/* Function to handle 404 Pages (Pages not found) and return the appropriate
response code and content */

const notFound = (response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.end('<h1>Sorry, Page Not Found</h1>');
};

module.exports = {
  homePage, notFound, assetsHandler, searchHandler,
};

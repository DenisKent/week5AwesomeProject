const fs = require('fs');
const path = require('path');

const homePage = (response) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.end('<h1>Sorry, something went wrong</h1>');
    } else {
      response.writeHead(200, { 'Content-type': 'text/html' });
      response.write(file);
    }
    response.end();
  });
};

const notFound = (response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.end('404 Page Not Found');
};

module.exports = { homePage };

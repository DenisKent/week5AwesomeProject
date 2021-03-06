# Awesome Air by Team Awesome - Sol, Denis & Matt

### Our Link: https://awesome-air.herokuapp.com/

## Our Ambition :art: :art:

Our project aims to help user's to understand the levels of air pollution in their area and compare it to cities throughout the world. We also provide scientific information about the different types of pollution in order to educate the audience.

## Wireframes :pencil2: :pencil2:

Our website has 4 distinct sections:

1.  **Header** - containing the name of the website and a description of how to use the site
2.  **Search box** - box for user input to select a comprator city. Dropdown suggestions are given to the user.
3.  **Comparison Table** - Table containing measurements of the user's location vs their comparator city chosen from the search box.
4.  **Scientific Information** - Information about the key terms related to pollution

![](https://i.imgur.com/EhYcJWu.png)

## File Structure, Architecture and Data Flow :wrench: :wrench:

The project has the following:

- **public**

  - favicon.ico
  - index.html
  - style.css
  - weather.png
  - xhr.js - contains the autocomplete and getPollutionData which both make data requests to the server for data.
  - dom.js - contains functions that update the structure of the website are made through this

- **source**

  - city100k.json
  - server.js - Set up of the server
  - router.js - 5 routes including home, assets, pollution data request, autocomplete request and 404 routes
  - handlers.js - Handler functions to serve each of the routes mentioned in router.js.
  - requests.js - makes API requests to the open air API using the requests module.
  - search.js - autocomplete helper function to searh through the json datafile and return phrases matching the user's search.

- **tests**
  - test.js

## Interesting Code

There are a number of interesting parts to our code on this project:

### Commenting

We used commenting as much as possible throughout the projct. This has 2 key benefits - 1. It allows all team members to be clear on the code and 2. It allows the writer of the code to have a reference point in future when understanding why they made certain decisions.

The team found it very useful to write comment code and definitely worth the additional time it takes.

```javascript
/* Function to get a request from the server based on the user's input */

function pollutionDataRequest(coordinates, cb) {
  /* Create new request */
  var xhr = new XMLHttpRequest();
  /* URL is get-pollution-data*/
  var url = '/get-pollution-data';
  /* Setting call back function for when response is received  */
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Action to be performed when the document is ready:
      cb(null, JSON.parse(xhr.responseText));
    }
    if (this.readyState == 4 && this.status == 204) {
      //Passes through an error if no data is returned
      cb(
        new Error('Sorry no air quality data could be found close to this city. Try another one.'),
      );
    }
    if (this.readyState == 4 && this.status == 404) {
      //Passes through an error if no data is returned
      cb(new Error('City coordinate data is formatted incorrectly.'));
    }
  };
  /* Open POST request with URL  */
  xhr.open('POST', url, true);
  /* Setting create request header for form input */
  xhr.setRequestHeader('Content-type', 'application/json');
  /* Send the user's input in the body of the request */
  xhr.send(JSON.stringify(coordinates));
}
```

### ES6 Syntax

We used ES6 Syntax throughout our back-end code and learnt a few new things

#### Object Deconstructor

When creating new variables from objects, we learnt to use the following syntax:

```javascript
const { url } = request;
```

Which is equivalent to (ES5):

```javascript
var url = url.request;
```

#### Template Literals

Template literals were also used as a much cleaner way to input varaibles into a string.

```javascript
const url = `https://api.openaq.org/v1/latest?coordinates=${lat},${long}&radius=${radius}&limit=${limit}`;
```

### Error Handling

We implemented an error first approach to the handlers, as defined in our workshops.

We also handled errors on the client side, showing a highly visible error message above the search box, for the following scenarios:

#### No data received

```javascript
if (this.readyState == 4 && this.status == 204) {
  //Passes through an error if no data is returned
  cb(new Error('Sorry no air quality data could be found close to this city. Try another one.'));
}
```

#### User declines to share location data with the app.

```javascript
//Error code is 1 when user doesn't allow location to be shared
if (error.code == 1) {
  warningMessage(
    'Testers- trying to break our app by declining geolocation..? Better luck next time.',
  );
} else {
  warningMessage(
    "Sorry, we can't find your location. Feel free to look at the listed major cities.",
  );
}
```

## Core Requirements :white_check_mark: :white_check_mark:

- [x] Use at least 1 API #3
- [x] Make your API calls from the back-end using the Request module (or one you build yourself)
- [x] Your server should contain a minimum of 2 routes
- [x] We expect back-end testing using Tape (test as many components as you can) and basic front-end testing.
- [x] Test your server by injecting fake HTTP requests using Supertest (consider testing for 404's and 500's). #8
- [x] Host your project on Heroku, see resources
- [x] Use module.exports and require to break a single large server file into smaller modules.
- [x] Consider a good server file structure based on what we have discussed over the week.
- [x] Employ continuous intergration on your project with Travis or a similar tool. (If you decide to use Travis, we strongly recommend that you host this project in your own repo rather than in your cohort's FAC repository to avoid all builds getting queued together) #15
- [x] Use CodeCov or a similar tool for test coverage.
- [x] Include Error Handling when a user attempts to make a request to a non-existent route to your server (404 - as mentioned above), provide the user with a custom response.
- [x] Include Error Handling if there is a programmer error on your server (e.g. a handler function does not act as intended, or receives a datatype it is not expecting), provide the user with a custom response (500 status code).
- [x] Include a user input field on your web app and include server-side validation to protect your server from potentially malicious user input. #25

## Stretch goal 😊: :page_facing_up: :page_facing_up:

- [x] Create a route and functionality for a POST request #4
- [ ] Display continuous intergration and code coverage badges on your project README. #10

## Assets used:

We are using the following API: https://docs.openaq.org/
[Geonames]http://download.geonames.org was used to populate the list of cities.

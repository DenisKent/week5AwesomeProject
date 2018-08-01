/* eslint-disable*/
/* Function to get a request from the server based on the user's input */

function pollutionDataRequest (userInput) {
  /* Create new request */
  var xhr = new XMLHttpRequest();
  /* URL is get-pollution-data*/
  var url = '/get-pollution-data';

  /* Setting call back function for when response is received  */
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Action to be performed when the document is ready:
      console.log(JSON.parse(xhr.responseText));
    }
  };
  /* Open POST request with URL  */
  xhr.open('POST', url, true);
  /* Setting create request header for form input */
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  /* Send the user's input in the body of the request */
  xhr.send(userInput);
}

function autocomplete (userInput,cb){
  /* Create new request */
  var xhr = new XMLHttpRequest();
  /* URL is get-pollution-data, we pass through the query to the end of it. It most also be encoded so it can be decoded on the back-end */
  var url = encodeURI('/autocomplete-city?q='+userInput);

  /* Setting call back function for when response is received  */
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Action to be performed when the document is ready:
      cb(JSON.parse(xhr.responseText));
    }
  };
  /* Open POST request with URL  */
  xhr.open('GET', url, true);
  /* Send the user's input in the body of the request */
  xhr.send();
}

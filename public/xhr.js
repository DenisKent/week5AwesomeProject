/* eslint-disable*/

/* Function to get a request from the server based on the user's input */

function serverDataRequest(userInput) {
  /* Create new request */
  var xhr = new XMLHTTPRequest();
  /* URL is get-data */
  var url = '/get-data';
  /* Setting create request header for form input */
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  /* Setting call back function for when response is received  */
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      document.getElementById('test').innerHTML = xhr.responseText;
    }
  };
  /* Open POST request with URL  */
  xhr.open('POST', url, true);
  /* Send the user's input in the body of the request */
  xhr.send(userInput);
}

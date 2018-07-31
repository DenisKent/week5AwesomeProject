/* eslint-disable*/

function serverDataRequest(userInput) {
  var xhr = new XMLHTTPRequest();
  var url = '/getData';
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      document.getElementById('test').innerHTML = xhr.responseText;
    }
  };
  xhr.open('POST', url, true);
  xhr.send(userInput);
}

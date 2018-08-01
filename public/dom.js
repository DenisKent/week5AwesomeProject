/* eslint-disable*/

/* Assigned the submitBtn from the DOM to the var */
var cityInput = document.getElementById('cityInputBox');
/* Runs the call back function when the submit button is clicked */

cityInput.addEventListener('keyup', function() {
  /* Collects the user's input from the box */
  // userInput = document.getElementById('cityInputBox').value;
  autocomplete(cityInput.value);
  /* Calls the fn severDataRequest (in xhr.js) with the user's input */
  // pollutionDataRequest(userInput);
});

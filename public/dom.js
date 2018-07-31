/* eslint-disable*/
console.log('dom');
/* Assigned the submitBtn from the DOM to the var */
var submitBtn = document.getElementById('submitBtn');
/* Runs the call back function when the submit button is clicked */
submitBtn.addEventListener('click', function() {
  /* Collects the user's input from the box */
  userInput = document.getElementById('cityInputBox').input;
  console.log(userInput);
  /* Calls the fn severDataRequest (in xhr.js) with the user's input */
  serverDataRequest(userInput);
});

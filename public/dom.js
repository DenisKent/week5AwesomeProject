/* eslint-disable*/

/* Assigned the submitBtn from the DOM to the var */
var cityInput = document.getElementById('cityInputBox');
var citiesDropdown = document.getElementById('citiesDropdown');
/* Runs the call back function when the submit button is clicked */

cityInput.addEventListener('keyup', function() {
  /* Collects the user's input from the box */
  var usrInput = cityInput.value
  /* Calls the fn severDataRequest (in xhr.js) with the user's input */
  if (usrInput){
    autocomplete(usrInput,populateDropdown);
  }
});

var populateDropdown = function(cityList){
  removeChildren(citiesDropdown);
  cityList.forEach(function(city){
    /* Create an option element for each city. Each option elemnt has two spans in it with the city name and city country*/
    var option = document.createElement("option");
    option.value = city.name
    var country = document.createElement("span")
    country.textContent = city["Alternate country code"];
    option.appendChild(country);
    citiesDropdown.appendChild(option);
  });
}

function removeChildren(obj) {
  while (obj.hasChildNodes()) {
    obj.removeChild(obj.firstChild);
  }
};

function cityDataRequest() {
    var val = document.getElementById("cityInputBox").value;
    var opts = document.getElementById("citiesDropdown").childNodes;
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].value === val) {
        // An item was selected from the list!
        // yourCallbackHere()
        alert(opts[i].value);
        break;
      }
    }
  }


  // pollutionDataRequest(userInput);

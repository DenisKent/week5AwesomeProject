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
    var name = document.createElement("span");
    var country = document.createElement("span");
    name.value = city.name;
    country.value = city["Alternate country code"];
    option.appendChild(name);
    option.appendChild(country);
    citiesDropdown.appendChild(option);
    //When the drop down is clicked, make the data request and pass it to the handler
    option.addEventListener('click', function(){
      var coordinates = {lat: city.latitude, long:city.longitude}
      pollutionDataRequest(coordinates,console.log)
    })
  });
}

function removeChildren(obj) {
  while (obj.hasChildNodes()) {
    obj.removeChild(obj.firstChild);
  }
};

function cityDataRequest(ev) {
  console.log(ev.selectedIndex);
  console.log("test");
    var inputVal = cityInput.value;
    var options = citiesDropdown.childNodes;
    for (var i = 0; i < options.length; i++) {
      var cityName = options[i]
      if (cityName.value === inputVal) {
        // An item was selected from the list!
        // yourCallbackHere()
        alert(options[i].city);
        break;
      }
    }
  }


  // pollutionDataRequest(userInput);

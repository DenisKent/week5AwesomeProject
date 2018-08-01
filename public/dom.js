/* eslint-disable*/

window.addEventListener('load', function(event) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(localPollutionDataRequest);
  } else {
    x.innerHTML = 'Geolocation is not supported by this browser.';
  }
});

function localPollutionDataRequest(position) {
  var coordinates = { lat: position.coords.latitude, long: position.coords.longitude };
  console.log(coordinates);
  pollutionDataRequest(coordinates, updateLocalData);
}

/* Assigned the submitBtn from the DOM to the var */
var cityInput = document.getElementById('cityInputBox');
var citiesDropdown = document.getElementById('citiesDropdown');
/* Runs the call back function when the submit button is clicked */

cityInput.addEventListener('keyup', function() {
  /* Collects the user's input from the box */
  var usrInput = cityInput.value;
  /* Calls the fn severDataRequest (in xhr.js) with the user's input */
  if (usrInput) {
    autocomplete(usrInput, populateDropdown);
  }
});

var populateDropdown = function(cityList) {
  removeChildren(citiesDropdown);
  cityList.forEach(function(city) {
    /* Create an option element for each city. Each option elemnt has two spans in it with the city name and city country*/
    var option = document.createElement('option');
    var name = document.createElement('span');
    var country = document.createElement('span');
    name.value = city.name;
    country.value = city['Alternate country code'];
    option.appendChild(name);
    option.appendChild(country);
    citiesDropdown.appendChild(option);
    //When the drop down is clicked, make the data request and pass it to the handler
    option.addEventListener('click', function() {
      var coordinates = { lat: city.latitude, long: city.longitude };
      pollutionDataRequest(coordinates, updateCompareData);
    });
  });
};

var updateLocalData = function(data) {
  for (i = 0; i < data.measurements.length; i++) {
    if (data.measurements[i].parameter === 'pm10') {
      document.getElementById('local_pm10').textContent = data.measurements[i].value;
    } else if (data.measurements[i].parameter === 'no2') {
      document.getElementById('local_no2').textContent = data.measurements[i].value;
    } else if (data.measurements[i].parameter === 'o3') {
      document.getElementById('local_o3').textContent = data.measurements[i].value;
    }
  }
};

var updateCompareData = function(data) {
  for (i = 0; i < data.measurements.length; i++) {
    if (data.measurements[i].parameter === 'pm10') {
      document.getElementById('compare_pm10').textContent = data.measurements[i].value;
    } else if (data.measurements[i].parameter === 'no2') {
      document.getElementById('compare_no2').textContent = data.measurements[i].value;
    } else if (data.measurements[i].parameter === 'o3') {
      document.getElementById('compare_o3').textContent = data.measurements[i].value;
    }
  }
};

function removeChildren(obj) {
  while (obj.hasChildNodes()) {
    obj.removeChild(obj.firstChild);
  }
}

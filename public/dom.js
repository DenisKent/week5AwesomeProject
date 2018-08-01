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
    var li = document.createElement('li');
    var divCity = document.createElement('div');
    var divCountry = document.createElement('div');
    li.setAttribute('tabindex', '0');
    li.classList.add('liList');
    divCity.classList.add('cityName');
    divCountry.classList.add('countryName');
    divCity.textContent = city.name;
    divCountry.textContent = city['Alternate country code'];
    citiesDropdown.appendChild(li);
    li.appendChild(divCity);
    li.appendChild(divCountry);
    //When the drop down is clicked, make the data request and pass it to the handler
    li.addEventListener('click', function() {
      console.log(city.latitude);
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

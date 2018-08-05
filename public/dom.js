/* global pollutionDataRequest autocomplete */
/* Assigned the submitBtn from the DOM to the var */
const cityInput = document.getElementById('cityInputBox');
const citiesDropdown = document.getElementById('citiesDropdown');

function warningMessage(text, delay) {
  const warning = document.createElement('span');
  warning.classList.add('warning');
  warning.textContent = text;
  cityInput.parentNode.insertBefore(warning, cityInput);
  if (delay) {
    setTimeout(() => {
      warning.remove();
    }, delay);
  }
}

const updateLocalData = (data) => {
  document.getElementById('your-city').textContent = data.city;
  for (let i = 0; i < data.measurements.length; i += 1) {
    if (data.measurements[i].parameter === 'pm10') {
      document.getElementById('local_pm10').textContent = `${data.measurements[i].value} ${data.measurements[i].unit}`;
    } else if (data.measurements[i].parameter === 'no2') {
      document.getElementById('local_no2').textContent = `${data.measurements[i].value} ${data.measurements[i].unit}`;
    } else if (data.measurements[i].parameter === 'o3') {
      document.getElementById('local_o3').textContent = `${data.measurements[i].value} ${data.measurements[i].unit}`;
    }
  }
};
// Sets up geolocation to get user IP coordinates, and pass them on
// to the localPollutionDataRequest function
function localPollutionDataRequest(position) {
  const coordinates = { lat: position.coords.latitude, long: position.coords.longitude };
  pollutionDataRequest(coordinates, (err, city) => {
    if (err) {
      warningMessage(
        "Sorry, we don't collect air quality data for your local area. Feel free to look at the listed major cities.",
      );
    } else {
      updateLocalData(city);
    }
  });
}

window.addEventListener('load', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(localPollutionDataRequest, (error) => {
      // Error code is 1 when user doesn't allow location to be shared
      if (error.code === 1) {
        warningMessage(
          "Testers- trying to break our app by declining geolocation..? Better luck next time. We won't be able to find pollution statistics for your location.",
        );
      } else {
        warningMessage(
          "Sorry, we can't find your location. Feel free to look at the listed major cities.",
        );
      }
    });
  } else {
    warningMessage(
      "Sorry, we can't find your location. Feel free to look at the listed major cities.",
    );
  }
});

function removeChildren(obj) {
  while (obj.hasChildNodes()) {
    obj.removeChild(obj.firstChild);
  }
}

function baseDataRefresh() {
  document.getElementById('compare_pm10').textContent = '-';
  document.getElementById('compare_no2').textContent = '-';
  document.getElementById('compare_o3').textContent = '-';
}

const updateCompareData = (data) => {
  baseDataRefresh();
  for (let i = 0; i < data.measurements.length; i += 1) {
    if (data.measurements[i].parameter === 'pm10') {
      document.getElementById('compare_pm10').textContent = `${data.measurements[i].value} ${data.measurements[i].unit}`;
    } else if (data.measurements[i].parameter === 'no2') {
      document.getElementById('compare_no2').textContent = `${data.measurements[i].value} ${data.measurements[i].unit}`;
    } else if (data.measurements[i].parameter === 'o3') {
      document.getElementById('compare_o3').textContent = `${data.measurements[i].value} ${data.measurements[i].unit}`;
    }
  }
};

// Fn to use geolocation data to make a polution request and update the local data table

const populateDropdown = (cityList) => {
  removeChildren(citiesDropdown);
  cityList.forEach((city) => {
    const li = document.createElement('li');
    const divCity = document.createElement('div');
    const divCountry = document.createElement('div');
    li.setAttribute('tabindex', '0');
    li.classList.add('liList');
    divCity.classList.add('cityName');
    divCountry.classList.add('countryName');
    divCity.textContent = city.name;
    divCountry.textContent = city['Alternate country code'];
    citiesDropdown.appendChild(li);
    li.appendChild(divCity);
    li.appendChild(divCountry);
    // When the drop down is clicked, make the data request and pass it to the handler
    li.addEventListener('click', () => {
      const coordinates = { lat: city.latitude, long: city.longitude };
      document.getElementById('comparator-city').textContent = city.name;
      pollutionDataRequest(coordinates, (err, thisCity) => {
        if (err) {
          warningMessage(err.message, 4000);
        } else {
          updateCompareData(thisCity);
        }
      });
      cityInput.value = city.name;
      removeChildren(citiesDropdown);
    });
  });
};


/* Runs the call back function when the submit button is clicked */

cityInput.addEventListener('keyup', () => {
  /* Collects the user's input from the box */
  const usrInput = cityInput.value;
  /* Calls the fn severDataRequest (in xhr.js) with the user's input */
  if (usrInput) {
    autocomplete(usrInput, populateDropdown);
  }
});

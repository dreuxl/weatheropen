const { API_KEY } = require('../libs/constants');

let outputElement;

// lat & long are harcoded here, had been determined with Postman using this API
// "http://api.openweathermap.org/geo/1.0/direct?q=San Francisco&limit=5"

let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=37.7790262&lon=-122.419906&appid=';

apiUrl = apiUrl + API_KEY;

module.exports.dataAPI = async function () {
  await fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      outputElement = JSON.parse(JSON.stringify(data, null, 2));
    })
    .catch(error => {
      console.error('Error:', error);
    });
  return outputElement;
};

const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/7b90bff04b5b99c6d3c5d47a1b2c51fc/${latitude},${longitude}`;
  request({ url: url, json: true }, (error, response) => {
    const { temperature, precipProbability } = response.body.currently;
    const { summary } = response.body.daily.data[0];
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (response.body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${summary}, Currently, its ${temperature} degrees & there is a ${precipProbability}% chance of rain`
      );
    }
  });
};

module.exports = forecast;

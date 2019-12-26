const request = require("request");
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaGFyaWtyaXNoa2siLCJhIjoiY2s0ankxbHF1MDd5MjN1czB6MTFpcTRmNCJ9.nI-hWNiKhbYVPQ0hSnCzUQ&limit=1`;

  request({ url: url, json: true }, (err, response) => {
    if (err) {
      callback("Unable to connect to location services", undefined);
    } else if (response.body.features.length === 0) {
      callback(
        "Unable to get proper coordinates. Try another search.",
        undefined
      );
    } else {
      const [lng, lat] = response.body.features[0].center;
      const { place_name: location } = response.body.features[0];
      callback(undefined, {
        lat: lat,
        lng: lng,
        location: location
      });
    }
  });
};
module.exports = geocode;

const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = process.env.GOOGLE_APIKEY;

// convert address to latitude and longitude, using google api
// temporarily return dummy data, to avoid cost
async function getCoordsForAddress(address) {
  return {
    lat: 41.7948,
    lng: -87.5907
  };
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsForAddress;

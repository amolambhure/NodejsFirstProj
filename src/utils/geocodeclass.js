const request = require("request");

const geocode = (address, callback) => {
    const urlGeo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYXJhbWJodXJlIiwiYSI6ImNsMG95dnU3cDFzeGMzanVvNGZ2dHBnd3AifQ.sv0zCw_79O9g5AJCf0Rj2g';
    request({url:urlGeo, json:true}, (error, response) => {
        if (error) {
            callback('Could not connect to server',undefined)
        } else if (response.body.features.length === 0){
            callback('Could not find locations')
        } else {
            callback(undefined,{
                long: response.body.features[0].center[1],
                lat: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
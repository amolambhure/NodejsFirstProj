const request = require("request");
console.log(process.argv)
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1840e927e74f19f7fce6e2eb30470117&query='+ latitude +','+ longitude +'&units=f';
    request({url:url, json:true}, (error, response) => {
        if (error) {
            callback('Could not connect to server',undefined)
        } else if (response.body.error) {
            callback('Unablel to find location',undefined)
        }else {
            callback(undefined,response.body.current.temperature)
        }
    })
}

module.exports = forecast
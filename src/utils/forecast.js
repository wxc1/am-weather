const request = require('request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
// https://api.darksky.net/forecast/ac6e1e01cf82bf18dd1ee1883b37881b/37.8267,-122.4233
const forecast = (latitude, longitude, callback) => {
const url = 'https://api.darksky.net/forecast/ac6e1e01cf82bf18dd1ee1883b37881b/' + latitude + ',' +longitude

request({url, json: true}, (error, { body}) => {
    if(error) {
        callback('Cannot connect to darksky! ', undefined)

    }else if(body.error) {
        callback('Unable to find weather of long, lat please try again! ', undefined)
    }else{
        const dailyData = body.daily.data[0]
        const summary = dailyData.summary
        const temp = body.currently.temperature
        const percip =  body.currently.precipProbability

        callback(undefined,
             summary+ " It is currently " + temp + " degrees" + ". There is a " + percip + "% chance of rain.  Hi of " + dailyData.temperatureHigh + " Lo of " + dailyData.temperatureLow

            )
            
            
    }
}

)
}


module.exports = forecast
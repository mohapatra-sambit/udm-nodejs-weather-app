const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=980df5b7177a836ea893fa9b4a852a57&query=' + latitude + ',' + longitude
    request({
        url,
        json: true
    }, (error, {
        body: {
            error: err,
            current: {
                weather_descriptions,
                temperature,
                feelslike,
                humidity
            },
            location: {
                localtime
            }
        }
    }
    ) => {
        if (error) {
            callback('Unable to connect to Weather Stack.', undefined)
        } else if (err) {
            callback('Invalid input. Please check and try again.', undefined)
        } else {
            // console.log(current)
            callback(undefined, {
                description: weather_descriptions[0],
                temperature,
                feelslike,
                humidity,
                localtime
            })
        }
    })
}

module.exports = forecast
const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FtYml0bW9oYXBhdHJhIiwiYSI6ImNsMjFlYmo5YjBqNnYzYm1tdjBnMHZqc2gifQ.iVsmul1q-i4e7wIhlDqxTw&limit=1'
    request({
        url,
        json: true
    }, (error, {body: {features}}) => {
        if (error) {
            callback('Unable to connect to MapBox.', undefined)
        } else if (features.length === 0) {
            callback('Invalid input. Please check and try again.', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                place: features[0].place_name
            })
        }
    })
}

module.exports = geocode
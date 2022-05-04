//Github Repo:  udm-nodejs-weather-app

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
const publicFolder = path.join(__dirname, '../public')
const viewsFolder = path.join(__dirname, '../templates/views')
const partialsFolder = path.join(__dirname, '../templates/partials')

app.use(express.static(publicFolder))

app.set('view engine', 'hbs')
app.set('views', viewsFolder)
hbs.registerPartials(partialsFolder)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sambit Mohapatra'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sambit Mohapatra',
        content: 'This is a sample help text'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Sambit Mohapatra',
        mobile: '+91-9538360042',
        email: 'sambit.mohapatra@gmail.com',
        address: 'Bangalore, Karnataka, India'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address passed in input'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (err, {description, temperature, feelslike, localtime, humidity} = {}) => {
            if (err) {
                return res.send({ error })
            }
            res.send({
                location: place,
                localtime,
                forecast: description,
                address: req.query.address,
                humidity,
                message: 'It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out.'
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Sambit Mohapatra',
        message: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sambit Mohapatra',
        message: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up and running at port', port)
})
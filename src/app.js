const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead2'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        helpText: 'This is some helpful text.',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'you must provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })
        })

    })
})


app.get('/products',(req,res) => {
    
    if(!req.query.search){
        return res.send({
            error: 'you must providea search term'
        })
    }
    console.log(req.query)
    res.send({
        product: []
    })

})
app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'Help Article',
        name: 'Andrew Mead',
        'errorMessage':'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Andrew Mead',
        'errorMessage':'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

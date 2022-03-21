// const  response  = require('express')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocodeclass')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templet/views')
const partialsPath = path.join(__dirname,'../templet/partials')

//Setup handlerbar engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
// hbs.registerPartial(partialsPath)

//setup static directory to server
app.use(express.static(publicDirPath))

app.get('', (req,res) => {
    res.render('index',{
        title:'Arihant Body Support Surgical Ahemdnagar',
        name:'Amol Ambhure'
    })
})
app.get('/about', (req,res) => {
    res.render('about',{
        title:'About Page',
        name:'Amol Ambhure'
    })
})
app.get('/help',(req,res) => {
    res.render('help', {
        helpDisplay: 'this is help page to display',
        title:'Help Page',
        name:'Amol Ambhure'
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error:'You must provide address'
        })
    }
    geocode(req.query.address,(error,{lat,long,location} = {}) => {
        if(error) {
            return res.send({error:error})
        }
        forecast(lat,long,(err,forcast) => {
            if(error) {
                return res.send({error:err})
            }

            res.send({
                temprature:forcast,
                location,
                address:req.query.address
            })

        })
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        title: '404 Page Not Found',
        name: 'Amol Ambhure',
        errorMessage: 'Page for which you are looking not found'
    })
})

/*
app.get('', (req, res) => {
    res.send('<h1>Express is running</h1>')
})*/
/*
app.get('/help', (req,res) => {
    res.send({
        name: 'amol',
        age: 32
    })
})

app.get('/about', (req,res) => {
    res.send('This is about page')
})
*/


app.listen(port, () => {
    console.log('Server is running on ' + port)
})
require('babel/register')({ stage: 0 })
require('dotenv').load()

var express = require('express')
var bodyParser = require('body-parser')

var routes = require('./config/routes')

var app = express()

app.use(bodyParser.urlencoded({ extended: true }))

routes.map(app)

app.listen(process.env.PORT || 3000, function () {
  console.log('listening...')
})

require('babel/register')({ stage: 0 })
require('dotenv').load()

var express = require('express')
var bodyParser = require('body-parser')

var routes = require('./config/routes')

var app = express()

app.use(bodyParser.json())

routes.map(app)

app.listen(3000 || process.env.PORT, function () {
  console.log('listening...')
})

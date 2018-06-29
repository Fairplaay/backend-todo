const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require("method-override");
// variables
const app = express()
const indexRoutes = require('./routes/index.js')

// middleware
app.use(methodOverride());
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
// routes
app.use('/', indexRoutes)

// settings
app.set('port', process.env.PORT || 9000)
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'))
})

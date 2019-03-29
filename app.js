'use strict';

var fs = require('fs');
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const catalogueRouter = require('./routes/catalogue');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');

let app = express();


// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());
});


//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//conectDB
mongoose.connect('mongodb://localhost/poc-catalogo', (err, response) => {
  if (err) {
    return console.log('Error al conectar con la base de datos', err)
  }
  let db = mongoose.connection;
  // console.log(db.collections)
// db.createCollection("catalogo", {strict:true}, function(error, collection){
//   console.log(error,collection)
// })
});

// Vista de cambio
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//Routes
app.use('/', indexRouter);
app.use('/catalogue', catalogueRouter);

// Error 404
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

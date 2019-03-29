'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('express')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
const mongoose = require('mongoose');
var serverPort = 3000;


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

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

//Problema de cors 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Configuraciones de Swagger 
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  app.use(middleware.swaggerMetadata());

  app.use(middleware.swaggerValidator());

  app.use(middleware.swaggerRouter(options));

  app.use(middleware.swaggerUi());

   http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});

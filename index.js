'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('express')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var serverPort = 3000;


dotenv.config();

//conectDB
mongoose.connect(`mongodb://${process.env.userDB}:${process.env.passwordDB}@debianci.eastus.cloudapp.azure.com/poc-catalogo`
,{ useNewUrlParser: true }).then(response => {
console.log("Se conecto correctamente a la base de datos")
}).catch(err => 
  console.log("error en la conexión ",err)
  )

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' 
};

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");
if (req.method === "OPTIONS") {
      return res.status(200).end();
  }
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
    console.log('El servidor está corriendo por el puerto %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui está corriendo de la siguiente forma  http://localhost:%d/docs', serverPort);
  });

});

'use strict';

var catalogo = require('../models/catalogue');
var jose = require('node-jose');


/** 
 @description Retorna el catálogo completo de la aplicación 
**/
module.exports.catalogueGET = function catalogueGET (req, res, next) {
  catalogo.find({},(err,catalogue) =>{
   res.status(200).send({
      message:"ok",
      product:catalogue
    });
  })
};


/**
 @description Lista catálogo de la aplicación según el respectivo filtro
 **/
module.exports.getCatalogueByFilter = function getCatalogueByFilter(req, res, next) {
  let valueFilter = req.swagger.params['filter'].value;
   catalogo.find({$or:[{nombre:{$regex:valueFilter,$options: 'i'}},{presentacion:{$regex:valueFilter,$options: 'i'}},
  {categoria:{$regex:valueFilter,$options: 'i'}}]}, (err,catalogue) =>{
    if (catalogue.length === 0 ){
    res.status(200).send({
      message:"ok",
      product:catalogue
    });
  }
  else {
    res.status(201).send({
      message:"No se encuentra parametros para este filtro",
      product:catalogue
    });
  }
  })
};

/**
 @description Lista catálogo de la aplicación según el respectivo filtro
 **/
module.exports.postChange = function postChange(req, res, next) {
  console.log(req)
     res.status(200).send({
      message:"No se encuentra parametros para este filtro",
});
}
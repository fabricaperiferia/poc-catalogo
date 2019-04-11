'use strict';

var catalogo = require('../models/catalogue');
var jose = require('node-jose');
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');


/** 
 @description Retorna el catálogo completo de la aplicación 
**/
module.exports.catalogueGET = function catalogueGET(req, res, next) {
  catalogo.find({}, (err, catalogue) => {
    res.status(200).send({
          message: "ok",
          product: jwt.sign(JSON.stringify(catalogue), 'test')
        });
    })
  }


/**
 * @author Raphael Martinez
 * @description Lista catálogo de la aplicación según el respectivo filtro
 **/

module.exports.getCatalogueByFilter = function getCatalogueByFilter(req, res, next) {
  let valueFilter = req.swagger.params['filter'].value;
   catalogo.find({$or:[{nombre:{$regex:valueFilter,$options: 'i'}},
   {presentacion:{$regex:valueFilter,$options: 'i'}},
  {categoria:{$regex:valueFilter,$options: 'i'}}]}, (err,catalogue) =>{
    if (catalogue.length !== 0 ){
    res.status(200).send({
      message:"ok",
      product:jwt.sign(JSON.stringify(catalogue), 'test')
    });
  }
  else {
    res.status(201).send({
      message:"No se encuentra parametros para este filtro",
      product:jwt.sign(JSON.stringify(catalogue), 'test')
    });
  }
  })
};

/**
 @description Lista catálogo de la aplicación según el respectivo filtro
 **/
module.exports.postChange = function postChange(req, res, next) {
  let catalogue = req.swagger.params['productos'].value
  catalogue.map(value => {
    value.cantidad = value.cantidad - value.cantidadVendido
    delete value.cantidadVendido
    let id = mongoose.Types.ObjectId(value._id)
    catalogo.findOneAndUpdate({ _id: id }, value, (err, res) => {
    })
  })
  res.status(200).send({
    message: "No se encuentra parametros para este filtro",
  });
}
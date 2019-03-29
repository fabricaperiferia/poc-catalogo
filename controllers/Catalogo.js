'use strict';

var utils = require('../utils/writer.js');
var catalogo = require('../models/catalogue');

module.exports.catalogueGET = function catalogueGET (req, res, next) {
  catalogo.find({},(err,catalogue) =>{
    res.status(200).send({
      message:"ok",
      product:catalogue
    });
  })
};

module.exports.getPetById = function getPetById (req, res, next) {
  let valueFilter = req.swagger.params['filter'].value;
  console.log(valueFilter)
  catalogo.find({nombre:{$regex:valueFilter}},(err,catalogue) =>{
    console.log(catalogue)
    res.status(200).send({
      message:"ok",
      product:catalogue
    });
  })
};

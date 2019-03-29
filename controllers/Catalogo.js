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
  console.log(req.params.filter)
  catalogo.find({nombre:{$regex:req.params.filter}},(err,catalogue) =>{
    res.status(200).send({
      message:"ok",
      product:catalogue
    });
  })
};

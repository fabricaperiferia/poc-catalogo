const express = require('express');
const router = express.Router();
const catalogo = require('../models/catalogue') 

/*Lista catalogo */
router.get('/', function(req, res, next) {
  // catalogo.createCollection();
  catalogo.find({},(err,catalogue) =>{
    res.status(200).send({
      message:"ok",
      product:catalogue
    });
  })
 });

/*Lista catalogo con filtro */
router.get('/:filter', function(req, res, next) {
  catalogo.find({nombre:req.params.filter},(err,catalogue) =>{
    res.status(200).send({
      message:"ok",
      product:catalogue
    });
  })
});
module.exports = router;

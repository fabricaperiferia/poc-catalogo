const express = require('express');
const router = express.Router();
const catalogo = require('../models/catalogue') 

/*Lista catalogo */
router.get('/', function(req, res, next) {
  catalogo.find({},(catalogue) =>{
    res.status(200).send({
      message:"ok",
      product:catalogue
    });
  })
 
});

/*Lista catalogo con filtro */
router.get('/:filter', function(req, res, next) {
  console.log(req.params.filter)
  res.send({
    message:req.params.filter
  });
});
module.exports = router;

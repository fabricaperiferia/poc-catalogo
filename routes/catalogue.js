let express = require('express');
let router = express.Router();

/*Lista catalogo */
router.get('/', function(req, res, next) {
  res.status(200).send({
    message:"ok",
    product:[]
  });
});

/*Lista catalogo con filtro */
router.get('/:filter', function(req, res, next) {
  console.log(req.params.filter)
  res.send({
    message:req.params.filter
  });
});
module.exports = router;

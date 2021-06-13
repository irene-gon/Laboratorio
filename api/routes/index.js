var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index', { title: 'Express IRENE' });
  res.send('Hola desde una ruta index');
});
module.exports = router;

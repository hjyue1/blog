var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页'});
});
router.get('/404', function(req, res, next) {
  res.render('404', { title: '404' });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/shopmgt', function(req, res, next) {
  res.render('shop/shopmgt', { title: 'Express' });
});

router.get('/activity', function(req, res, next) {
  res.render('activity/activity', { title: 'Express' });
});

router.get('/brand', function(req, res, next) {
  res.render('brand/brand', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login/login', { title: 'Express' });
});

router.get('/regist', function(req, res, next) {
  res.render('login/regist', { title: 'Express' });
});

router.get('/cdity', function(req, res, next) {
  res.render('spfl/cdity', { title: 'Express' });
});

router.get('/newest', function(req, res, next) {
  res.render('spfl/newest', { title: 'Express' });
});

router.get('/spfl', function(req, res, next) {
  res.render('spfl/spfl', { title: 'Express' });
});



module.exports = router;

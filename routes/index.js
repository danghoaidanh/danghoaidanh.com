var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'danghoaidanh' });
});

//get background page
router.get('/background', function (req, res, next) {
  res.render('403', {title: 'You have no permission to see this page'});
});

//get achivement page
router.get('/achievement', function (req, res, next) {
  res.render('403', {title: 'You have no permission to see this page'});
});

//get skills page
router.get('/skills', function (req, res, next) {
  res.render('403', {title: 'Skills'});
});

// get test page
router.get('/test', function (req, res, next) {
  res.render('test', {title: 'test'});
});

//get english page

router.get('/english-everyday', function (req, res, next) {
  res.render('english-everyday', {title: 'English Everyday'});
});

//get link products
router.get('/products', function (req, res, next) {
  res.render('403', {title: 'Products'});
});


//get link nofbaf.com
router.get('/nofbaf', function (req, res, next) {
  res.render('403', {title: 'www.nofbaf.com'});
});

//get link iosapps
router.get('/iosapps', function (req, res, next) {
  res.render('403', {title: 'iOS Apps'});
});

module.exports = router;

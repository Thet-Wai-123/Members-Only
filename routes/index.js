var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sign-up', function(req, res, next) {
  res.render('sign-up-form', { title: 'Express' });
});

router.get('/log-in', function(req, res, next) {
  res.render('log-in-form', { title: 'Express' });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page_name: 'index' });
});

router.get('/aboutme', function(req, res, next) {
  res.render('aboutme', { page_name: 'aboutme' });
});

router.get('/projects', function(req, res, next) {
  res.render('projects', { page_name: 'projects' });
});

router.get('/services', function(req, res, next) {
  res.render('projects', { page_name: 'services' });
});

router.get('/contactme', function(req, res, next) {
  res.render('contactme', { page_name: 'contactme' });
});

module.exports = router;

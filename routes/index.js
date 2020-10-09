var express = require('express');
var router = express.Router();

const general_title = 'Jonny\'s Portfolio Site';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: general_title, page_name: 'home' });
});

router.get('/aboutme', function(req, res, next) {
  res.render('aboutme', { title: general_title, page_name: 'aboutme' });
});

router.get('/projects', function(req, res, next) {
  res.render('projects', { title: general_title, page_name: 'projects' });
});

router.get('/services', function(req, res, next) {
  res.render('projects', { title: general_title, page_name: 'services' });
});

router.get('/contactme', function(req, res, next) {
  res.render('contactme', { title: general_title, page_name: 'contactme' });
});

module.exports = router;

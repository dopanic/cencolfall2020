let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

// GET route for the Index page
router.get('/', indexController.renderIndexPage);

// GET route for the AboutMe page
router.get('/aboutme', indexController.renderAboutMePage);

// GET route for the Projects page
router.get('/projects', indexController.renderProjectsPage);

// GET route for the Services page
router.get('/services', indexController.renderProjectsPage);

// GET route for the ContactMe page
router.get('/contactme', indexController.renderContactMePage);

module.exports = router;

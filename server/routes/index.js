let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

// GET route to render the Index page
router.get('/', indexController.renderIndexPage);

// GET route to render the AboutMe page
router.get('/aboutme', indexController.renderAboutMePage);

// GET route to render the Projects page
router.get('/projects', indexController.renderProjectsPage);

// GET route to render the Services page
router.get('/services', indexController.renderServicesPage);

// GET route to render the ContactMe page
router.get('/contactme', indexController.renderContactMePage);

// GET route to render the SignIn page
router.get('/signin', indexController.renderSignInPage);

// POST route for the SignIn process
router.post('/signin', indexController.processSignIn);

// GET route to render the Register page
router.get('/register', indexController.renderRegisterPage);

// POST route for the Register process
router.post('/register', indexController.processRegister);

// GET route for the LogOut process
router.get('/logout', indexController.processLogOut);

module.exports = router;

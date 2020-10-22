let express = require('express');
let router = express.Router();

// render the Index page
module.exports.renderIndexPage = (req, res, next) => {
    res.render('index', { page_name: 'index'});
}

// render the AboutMe page
module.exports.renderAboutMePage = (req, res, next) => {
    res.render('aboutme', { page_name: 'aboutme'});
}

// render the Projects&Services page
module.exports.renderProjectsPage = (req, res, next) => {
    res.render('projects', { page_name: 'projects'});
}

// render the ContactMe page
module.exports.renderContactMePage = (req, res, next) => {
    res.render('contactme', { page_name: 'contactme'});
}
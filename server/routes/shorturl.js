let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let urlShortenerController = require('../controllers/shorturl');

// helper function to protect purposes
function requireAuth(req, res, next)
{
    // check if it is signed in
    if(!req.isAuthenticated())
    {
        return res.redirect('/signin');
    }
    next();
}

// GET route to render the landing page for the URL Shortener
router.get('/', urlShortenerController.renderShortUrlPage);

// POST route for
router.post('/', urlShortenerController.processShortUrl);

// GET route to redirect to the original website of the shorten url
router.get('/:url_code', urlShortenerController.redirectShortUrl);

module.exports = router;
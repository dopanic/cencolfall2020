let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create the urlShortener Model instance
let urlModel = require('../models/shorturl');
let Url = urlModel.Url; // alias

// render the landing page for the URL Shortener
module.exports.renderShortUrlPage = (req, res, next) => {
    res.render('./shorturl/shorturl',
        {
            page_name: 'shorturl',
            messages: req.flash('urlMsg'),
            displayName: req.user ? req.user.displayName : ''
        });
}

module.exports.processShortUrl = (req, res, next) => {

    let longUrl = req.body.long_url;

    Url.findOne({ "longUrl": longUrl }, (err, existedUrl) => {
        if (err)
        {
            return console.error(err);
        }
        else
        {
            if (existedUrl) {
                req.flash('urlMsg', 'Already exists: ' + existedUrl.shortCode);
                return res.redirect('/shorturl');
            }
            else
            {
                let candidateUrlCode = Math.floor(Math.random() * 9000 ) + 1000;

                let asyncLoop = (isUrlCodeUnique, callback) => {
                    if(isUrlCodeUnique === false ) {
                        Url.findOne({ "shortenUrl": candidateUrlCode }, (err, foundUrl) => {
                            if (err)
                            {
                                return console.error(err);
                            }
                            else {
                                if(foundUrl)
                                {
                                    candidateUrlCode = Math.floor(Math.random() * 9000 ) + 1000;
                                }
                                else
                                {
                                    isUrlCodeUnique = true;
                                }
                                asyncLoop(isUrlCodeUnique, callback);
                            }
                        });
                    } else {
                        callback();
                    }
                }

                asyncLoop(false, function() {
                    let targetUrl = Url({
                        "longUrl": longUrl,
                        "shortCode": candidateUrlCode
                    });
        
                    Url.create(targetUrl, (err, Url) => {
                        if(err)
                        {
                            console.log(err);
                            res.end(err);
                        }
                        else
                        {
                            res.render('./shorturl/landing',
                                {
                                    page_name: 'shorturl',
                                    displayName: req.user ? req.user.displayName : '',
                                    targetUrl: targetUrl
                                });
                        }
                    });
                });
            }
        }
    });
}

module.exports.redirectShortUrl = (req, res, next) => {
    let urlCode = req.params.url_code;
    Url.findOne({ "shortCode": urlCode}, (err, foundUrl) => {
        if (err)
        {
            return console.error(err);
        }
        else{
            if(foundUrl)
            {
                res.redirect(foundUrl.longUrl);
            }
            else
            {
                req.flash('urlMsg', 'There is no such a shorten url');
                return res.redirect('/shorturl');
            }
        }
    });
}
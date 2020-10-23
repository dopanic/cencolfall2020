let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const { authenticate } = require('passport');
let passport = require('passport');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

// render the Index page
module.exports.renderIndexPage = (req, res, next) => {
    res.render('index', { page_name: 'index', displayName: req.user ? req.user.displayName : '' });
}

// render the AboutMe page
module.exports.renderAboutMePage = (req, res, next) => {
    res.render('aboutme', { page_name: 'aboutme', displayName: req.user ? req.user.displayName : '' });
}

// render the Projects&Services page
module.exports.renderProjectsPage = (req, res, next) => {
    res.render('projects', { page_name: 'projects', displayName: req.user ? req.user.displayName : '' });
}

// render the ContactMe page
module.exports.renderContactMePage = (req, res, next) => {
    res.render('contactme', { page_name: 'contactme', displayName: req.user ? req.user.displayName : '' });
}

// render the SignIn page
module.exports.renderSignInPage = (req, res, next) => {
    // check if it is already signed in
    if(!req.user)
    {
        res.render('auth/signin',
        {
            page_name: 'signin',
            messages: req.flash('signinMsg'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else{
        return res.redirect('/');
    }
}

// processing sign a user in
module.exports.processSignIn = (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            // when there is a server error
            if(err)
            {
                return next(err);
            }
            // when there is an user error
            if(!user)
            {
                req.flash('signinMsg', 'Authentication Error');
                return res.redirect('/signin');
            }
            req.login(user, (err) => {
                if(err)
                {
                    return next(err);
                }
                return res.redirect('/contacts');
            });
        })(req, res, next);
}

module.exports.renderRegisterPage = (req, res, next) => {
    // check if it is already signed in
    if(!req.user)
    {
        res.render('auth/register',
        {
            page_name: 'register',
            messages: req.flash('registerMsg'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else{
        return res.redirect('/register');
    }
}

module.exports.processRegister = (req, res, next) => {
    // initialize a user object
    let newUser = new User({
        username: req.body.username,
        // password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayname
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log('Error: Inserting New User');
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMsg',
                    'Registration Error: User Already Exists.'
                );
                console.log('Error: User Already Exists.');
            }
            return res.render('auth/register',
            {
                page_name: 'register',
                messages: req.flash('registerMsg'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contacts');
            });
        }
    })
}

module.exports.processLogOut = (req, res, next) => {
    req.logout();
    res.redirect('/');
}
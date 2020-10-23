let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let contactController = require('../controllers/contact');

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

// GET route to render the list page: READ
router.get('/', contactController.renderContactsListPage);

// POST route for the add process: CREATE
router.post('/', requireAuth, contactController.processAddContact);

// GET route to render EDIT page: UPDATE
router.get('/edit/:id', requireAuth, contactController.renderEditContactPage);

// POST route for the EDIT process: UPDATE
router.post('/edit/:id', requireAuth, contactController.processEditContact);

// GET route for the DELETE process: DELETE
router.get('/delete/:id', requireAuth, contactController.processDeleteContact);

module.exports = router;
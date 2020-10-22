let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to out Contact Model
let Contact = require('../models/contact');

// GET route to prepare the contact list page: READ
router.get('/', (req, res, next) => {
    Contact.find((err, contactList) => {
        if (err)
        {
            return console.error(err);
        }
        else{
            res.render('./contacts/list', { page_name: 'contacts_list', contact_list: contactList });
        }
    })
});

// POST route for the ADD process: CREATE
router.post('/', (req, res, next) => {
    let newContact = Contact({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    Contact.create(newContact, (err, Contact) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the list
            res.redirect('/contacts');
        }
    });
});

// GET route to prepare the EDIT page: UPDATE
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, targetContact) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            Contact.find((err, contactList) => {
                if (err)
                {
                    return console.error(err);
                }
                else{
                    //show the edit view
                    res.render('./contacts/list', { page_name: 'contacts_list', target_contact: targetContact, contact_list: contactList });
                }
            })
        }
    });

});

// POST route for the EDIT process: UPDATE
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id

    let updatedContact = Contact({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    Contact.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list
            res.redirect('/contacts');
        }
    });
});

// GET route for the DELETE process: DELETE
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    Contact.remove({_id: id}, (err) => {
        if (err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             // refresh the contact list
             res.redirect('/contacts');
         }
    });
});

module.exports = router;
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// creat a reference for the model
let Contact = require('../models/contact');

// render the list of Contacts page
module.exports.renderContactsListPage = (req, res, next) => {
    let sortingField = 'name'; // the default sorting field is name
    if(typeof req.query.field === 'string') sortingField = req.query.field;
    let sortingOrder =  'asc'; // the default sorting order is ascending
    if(typeof req.query.order === 'string') sortingOrder = req.query.order;

    Contact.find((err, contactList) => {
        if (err)
        {
            return console.error(err);
        }
        else{
            res.render('./contacts/list', { page_name: 'contacts_list', contact_list: contactList, displayName: req.user ? req.user.displayName : '' });
        }
    }).sort( { [sortingField]: sortingOrder } );
}

// process adding a contact
module.exports.processAddContact = (req, res, next) => {
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
}

// render the edit of Contacts page
module.exports.renderEditContactPage = (req, res, next) => {
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
                    res.render('./contacts/list', { page_name: 'contacts_edit', target_contact: targetContact, contact_list: contactList, displayName: req.user ? req.user.displayName : '' });
                }
            }).sort( { name: 1 } );
        }
    });
}

// process editing a contact
module.exports.processEditContact = (req, res, next) => {
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
}

// process deleting a contact
module.exports.processDeleteContact = (req, res, next) => {
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
}
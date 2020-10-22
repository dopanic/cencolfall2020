let express = require('express');
let router = express.Router();

let contactController = require('../controllers/contact');

// GET route for the list page: READ
router.get('/', contactController.renderContactsListPage);

// POST route for the add process: CREATE
router.post('/', contactController.processAddContact);

// GET route to prepare the EDIT page: UPDATE
router.get('/edit/:id', contactController.renderEditContactPage);

// POST route for the EDIT process: UPDATE
router.post('/edit/:id', contactController.processEditContact);

// GET route for the DELETE process: DELETE
router.get('/delete/:id', contactController.processDeleteContact);

module.exports = router;
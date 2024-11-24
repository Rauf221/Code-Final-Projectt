const express = require('express');
const router = express.Router();
const {
  createContact,
  getAllContacts,
  getSingleContact,
  updateContactStatus,
  deleteContact
} = require('../Controllers/contactController');

router.post('/', createContact);
router.get('/', getAllContacts);
router.get('/:id', getSingleContact);
router.patch('/:id', updateContactStatus);
router.delete('/:id', deleteContact);

module.exports = router;
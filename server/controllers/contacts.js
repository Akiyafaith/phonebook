// Import the database connection
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Create a new contact
const createContact = (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;

  pool.query(
    'INSERT INTO contacts (first_name, last_name, phone_number) VALUES (?, ?, ?)',
    [firstName, lastName, phoneNumber],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create contact' });
      } else {
        res.status(201).json({ message: 'Contact created successfully' });
      }
    }
  );
};

// Retrieve all contacts
const getAllContacts = (req, res) => {
  pool.query('SELECT * FROM contacts', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve contacts' });
    } else {
      res.status(200).json(results);
    }
  });
};

// Update a contact
const updateContact = (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;
  const contactId = req.params.id;

  pool.query(
    'UPDATE contacts SET first_name = ?, last_name = ?, phone_number = ? WHERE id = ?',
    [firstName, lastName, phoneNumber, contactId],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update contact' });
      } else {
        res.status(200).json({ message: 'Contact updated successfully' });
      }
    }
  );
};

// Delete a contact
const deleteContact = (req, res) => {
  const contactId = req.params.id;

  pool.query('DELETE FROM contacts WHERE id = ?', [contactId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete contact' });
    } else {
      res.status(200).json({ message: 'Contact deleted successfully' });
    }
  });
};

module.exports = {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
};
module.exports = router;

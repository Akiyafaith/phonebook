const pool = require('../db');
const express = require('express');
const router = express.Router();

// Create a new contact
router.post('/', (req, res) => {
  // Extract contact details from the request body
  const { firstName, lastName, phoneNumber } = req.body;

  // Insert the contact into the database
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
});

// Retrieve all contacts
router.get('/', (req, res) => {
  // Fetch all contacts from the database
  pool.query('SELECT * FROM contacts', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve contacts' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Update a contact
router.put('/:id', (req, res) => {
  // Extract contact details from the request body
  const { firstName, lastName, phoneNumber } = req.body;
  const contactId = req.params.id;

  // Update the contact in the database
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
});

// Delete a contact
router.delete('/:id', (req, res) => {
  const contactId = req.params.id;

  pool.query('DELETE FROM contacts WHERE id = ?', [contactId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete contact' });
    } else {
      res.status(200).json({ message: 'Contact deleted successfully' });
    }
  });
});

// Test endpoint to check database connection
router.get('/test', (req, res) => {
  // Execute a sample query to the database
  pool.query('SELECT 1', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to connect to the database' });
    } else {
      res.status(200).json({ message: 'Database connected successfully' });
    }
  });
});


module.exports = router;


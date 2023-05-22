import React, { useState } from 'react';
import axios from 'axios';

const AddNewContact = ({ handleAddContact, contact }) => {
  const [firstName, setFirstName] = useState(contact?.first_name || '');
  const [lastName, setLastName] = useState(contact?.last_name || '');
  const [phoneNumber, setPhoneNumber] = useState(contact?.phone_number || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !phoneNumber) {
      alert('Please fill in all fields');
      return;
    }
    const newContact = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber
    };
     // Make an API request to the server to create a new contact
     handleAddContact(newContact);

     // Make an API request to add/update the contact in the backend
    const apiEndpoint = contact ? `/api/contacts/${contact.id}` : '/api/contacts';
    const apiMethod = contact ? 'put' : 'post';

    axios
    [apiMethod](apiEndpoint, newContact)
    .then((response) => {
      console.log(response.data);
      // Optionally, perform any additional actions after successful API call
    })
    .catch((error) => {
      console.error(error);
      // Optionally, handle the error
    });

  // Clear the input fields
  setFirstName('');
  setLastName('');
  setPhoneNumber('');
};

  return (
    <form className="add-contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default AddNewContact;

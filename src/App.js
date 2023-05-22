import React, { useState, useEffect }  from 'react';
import Header from './components/Header.js';
/*import SearchBar from './components/SearchBar';*/
import AddNewContact from './components/AddNewContact';
import './App.css';
import callIcon from './call-icon.jpeg'
import deleteIcon from './delete-icon.png';
import { default as axios } from 'axios';




const App = () => {
  const [showAddContact, setShowAddContact] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    axios
      .get('/api/contacts')
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleAddContact = (newContact) => {
    // Logic to add the contact to the database
    const { first_name, last_name, phone_number } = newContact;
    axios
      .post('/api/contacts', { first_name, last_name, phone_number })
      .then((response) => {
        console.log(response.data);
        setContacts([...contacts, response.data]);
  
      })
      .catch((error) => {
        console.error(error);
        // Optionally, handle the error
      });
  };
  

  const handleDeleteContact = (id) => {
    axios
      .delete(`/api/contacts/${id}`)
      .then((response) => {
        console.log(response.data);
        const updatedContacts = contacts.filter((contact) => contact.id !== id);
        setContacts(updatedContacts);
      })
      .catch((error) => {
        console.error(error);
      });
  };



return (
  <div>
      <Header setShowAddContact={setShowAddContact} showAddContact={showAddContact} handleAddContact={handleAddContact} />
      {showAddContact ? <AddNewContact handleAddContact={handleAddContact}contact={contacts} />  : null}


      {contacts.map((contact, index) => (
        <div key={contact.id} className='contact'>
        <div className='contact-info'>  
          <p>{contact.first_name} {contact.last_name}</p>
          <div className='phone'>
          <img src={callIcon} alt="Call Icon" className="call-icon" />
            <span>{contact.phone_number}</span>
          </div>
          </div>
        <div className='contact-actions'>
        <img src={deleteIcon} alt="Delete" className="delete-icon" onClick={() => handleDeleteContact(contact.id)} />
        </div>
        </div>
      ))}
    </div>
);
};

export default App;

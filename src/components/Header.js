import React from 'react';
import SearchBar from './SearchBar';
import './Header.css'
import logo from './logo.png';

const Header = ({ setShowAddContact,showAddContact  }) => {
  const handleAddContact = () => {
    console.log('Add button clicked');
    setShowAddContact(!showAddContact);
  };

  return (
    <div className='container'>
    <div className='header-container'>
        <img src={logo} alt='logo' width = '30' height = "30" />
        <h1>Phone Book App</h1>
      </div>
      <div className="header-buttons">
      <span className="contacts-text">Contacts</span>
      <button className="add-contact-button" onClick={handleAddContact}>
      {showAddContact ? 'Cancel' : '+ Add Contact'}
        </button>
      </div>
      <SearchBar />
    </div>
  );
};

export default Header;

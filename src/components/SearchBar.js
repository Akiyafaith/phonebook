import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchQuery, handleSearch }) => {
  return (
    <div className="search-bar">
      <img src={require('./search.png')} alt="Search Icon" />
      <input type="text" placeholder="Search for contact by last name..."
      value={searchQuery}
      onChange={handleSearch}
      />
    </div>
  );
};
export default SearchBar;
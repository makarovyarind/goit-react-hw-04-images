import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Searchbar.css';
import { AiOutlineSearch } from "react-icons/ai";

export function Searchbar ({ onSubmit }){

  const [searchName, setsearchName] = useState('')
  
  const handleChange = e => {
    setsearchName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchName.trim() === '') {
      alert('enter the name you are looking for');
      return;
    }
    onSubmit(searchName);
    setsearchName({ searchName: '' });
  };

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <AiOutlineSearch style={{ width: '25px', position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)' }} size='28px' />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchName}
            onChange={handleChange}
          />
        </form>
      </header>
    );
  };

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
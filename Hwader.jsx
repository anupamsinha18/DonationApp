// Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Hwader = () => {
 

  return (
    <div className='header'>
      <Link to="/">Home</Link>
      <Link to="/donation">Donation Form</Link>
      <Link to="/About">DonarList</Link>
    </div>
  );
};

export default Hwader;

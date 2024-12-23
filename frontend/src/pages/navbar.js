import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#343a40',
        color: 'white',
      }}
    >
      <h1 style={{ fontSize: '24px' }}>MyCompany</h1>
      <div>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
            margin: '0 1rem',
            fontWeight: '500',
            fontSize: '16px',
          }}
        >
          Home
        </Link>
        <Link
          to="/about"
          style={{
            color: 'white',
            textDecoration: 'none',
            margin: '0 1rem',
            fontWeight: '500',
            fontSize: '16px',
          }}
        >
          About
        </Link>
        <Link
          to="/services"
          style={{
            color: 'white',
            textDecoration: 'none',
            margin: '0 1rem',
            fontWeight: '500',
            fontSize: '16px',
          }}
        >
          Services
        </Link>
        <Link
          to="/contact"
          style={{
            color: 'white',
            textDecoration: 'none',
            margin: '0 1rem',
            fontWeight: '500',
            fontSize: '16px',
          }}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

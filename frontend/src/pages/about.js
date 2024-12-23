import React from 'react';
import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <div
      style={{
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        margin: '5vh auto',
        width: '70%',
      }}
    >
      <Helmet>
        <title>About Us | MyCompany</title>
        <meta
          name="description"
          content="Learn more about MyCompany, a leading mobile app development company."
        />
      </Helmet>
      <h1 style={{ fontSize: '32px', color: '#343a40', marginBottom: '1rem' }}>About Us</h1>
      <p style={{ fontSize: '18px', color: '#495057' }}>
        We are a team of experts dedicated to creating innovative mobile applications.
      </p>
    </div>
  );
};

export default About;

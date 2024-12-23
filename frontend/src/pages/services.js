import React from 'react';
import { Helmet } from 'react-helmet';

const Services = () => {
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
        <title>Our Services | MyCompany</title>
        <meta
          name="description"
          content="Discover our mobile app development services for iOS and Android platforms."
        />
      </Helmet>
      <h1 style={{ fontSize: '32px', color: '#343a40', marginBottom: '1rem' }}>Our Services</h1>
      <ul style={{ listStyleType: 'none', padding: '0', color: '#495057' }}>
        <li style={{ fontSize: '18px', marginBottom: '0.5rem' }}>Custom iOS App Development</li>
        <li style={{ fontSize: '18px', marginBottom: '0.5rem' }}>Custom Android App Development</li>
        <li style={{ fontSize: '18px', marginBottom: '0.5rem' }}>UI/UX Design</li>
        <li style={{ fontSize: '18px', marginBottom: '0.5rem' }}>App Maintenance and Support</li>
      </ul>
    </div>
  );
};

export default Services;

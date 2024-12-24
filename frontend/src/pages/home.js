import React from 'react';
import { Helmet } from 'react-helmet';

const Home = () => {
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
        <title>Mobile App Development Company | MyCompany</title>
        <meta
          name="description"
          content="We specialize in mobile app development for iOS and Android. Contact us for top-notch mobile solutions."
        />
      </Helmet>
      <h1 style={{ fontSize: '32px', color: '#343a40', marginBottom: '1rem' }}>Welcome to MyCompany</h1>
      <p style={{ fontSize: '18px', color: '#495057' }}>
        Your trusted partner for mobile app development and web development.
      </p>
    </div>
  );
};

export default Home;

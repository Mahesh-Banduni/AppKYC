import React, { useState } from 'react';
import axios from 'axios';

const AuthLogin = () => {
  const [userData, setuserData] = useState({
     ID: '', password: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        ...userData, 
      }
    );
      if (response?.status === 201){
      //alert('Job posted successfully!');
      localStorage.setItem(
        "token",
        JSON.stringify(response?.data?.token)
      );
      setStatus('User logged-in successfully!');
      setuserData({ ID: '', password: ''});
    }
    else{
        setStatus('Login failed. Please try again.');
        setuserData({ ID: '', password: ''});
    }
    } catch (error) {
      if (error?.status === 404){
        //alert('Job posted successfully!');
        setStatus('User not found');
        setuserData({ ID: '', password: ''});
      }
      else if (error?.status === 400){
        //alert('Job posted successfully!');
        setStatus('Incorrect Password');
        setuserData({ ID: '', password: ''});
      }
      else{
      console.error(error);
      setStatus('Failed to Accees Page.');
      setuserData({ ID: '', password: ''});
      //alert('Failed to post the job.');
    }
    }
  };

  return (
    <div
      style={{
        margin: '5vh auto',
        padding: '2rem',
        width: '50%',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ fontSize: '32px', color: '#343a40', marginBottom: '1rem' }}>Login</h1>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: '1rem',
        }}
        onSubmit={handleSubmit}
      >
        <div>
          <label style={{ fontWeight: '600', fontSize: '14px', color: '#495057' }}>ID:</label>
          <input
            style={{
              padding: '0.8rem',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '14px',
              width: '100%',
            }}
            type="text"
            name="ID"
            value={userData.ID}
            placeholder="Enter your ID"
            onChange={handleChange}
            required
          />
        </div>
        <div>
        <label style={{ fontWeight: '600', fontSize: '14px', color: '#495057' }}>Password:</label>
          <input
            style={{
              padding: '0.8rem',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '14px',
              width: '100%',
            }}
            type="text"
            name="password"
            value={userData.password}
            placeholder="Enter your ID"
            onChange={handleChange}
            required
          />
        </div>
        <button
          style={{
            padding: '0.8rem',
            backgroundColor: '#007bff',
            color: 'white',
            fontWeight: '600',
            fontSize: '16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          type="submit"
          onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
        >
          Login
        </button>
      </form>
      {status && (
                <p
                    style={{
                        marginTop: '1rem',
                        color: status.includes('Error') ? '#dc3545' : '#28a745',
                        fontWeight: '600',
                        fontSize: '14px',
                    }}
                >
                    {status}
                </p>
            )}
    </div>
  );
};

export default AuthLogin;

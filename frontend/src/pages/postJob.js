import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

const PostJob = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { state: { from: location.pathname } }); // Redirect to login page if token is not present
    }
  }, [navigate, location]);

  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem('token'));
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/jobs`, {
        ...jobData,
      },{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
      if (response?.status === 201){
      //alert('Job posted successfully!');
      setStatus('Job Posted successfully!');
      setJobData({ title: '', description: '', location: ''});
    }
    else{
        setStatus('Error posting Job. Please try again.')
    }
    } catch (error) {
      if (error?.status === 401){
        //alert('Job posted successfully!');
        setStatus('Access Denied');
        setJobData({ title: '', description: '', location: ''});
      }
      else{
        console.error(error);
      //alert('Failed to post the Job.');
      setStatus('Error posting Job. Please try again.');
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
      <h1 style={{ fontSize: '32px', color: '#343a40', marginBottom: '1rem' }}>Post a Job</h1>
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
          <label style={{ fontWeight: '600', fontSize: '14px', color: '#495057' }}>Title:</label>
          <input
            style={{
              padding: '0.8rem',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '14px',
              width: '100%',
            }}
            type="text"
            name="title"
            value={jobData.title}
            placeholder="Enter job title"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={{ fontWeight: '600', fontSize: '14px', color: '#495057' }}>Description:</label>
          <textarea
            style={{
              padding: '0.8rem',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '14px',
              resize: 'vertical',
              minHeight: '120px',
              width: '100%',
            }}
            name="description"
            value={jobData.description}
            placeholder="Provide a detailed job description"
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label style={{ fontWeight: '600', fontSize: '14px', color: '#495057' }}>Location:</label>
          <input
            style={{
              padding: '0.8rem',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '14px',
              width: '100%',
            }}
            type="text"
            name="location"
            value={jobData.location}
            placeholder="Enter job location"
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
          Post Job
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

export default PostJob;

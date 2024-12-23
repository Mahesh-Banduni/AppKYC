import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/contact`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response?.statusText === "OK"){
            setStatus('Message sent successfully!');
            setFormData({ name: '', email: '', phone: '', message: '' });
        }else{
            setStatus('Something went wrong. Please try again.');
        }
        } catch (error) {
            setStatus('Error sending message. Please try again.');
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
            <Helmet>
                <title>Contact Us | MyCompany</title>
                <meta
                name="description"
                content="Get in touch with MyCompany for your mobile app development needs."
                />
            </Helmet>
            
            <h1 style={{ fontSize: '32px', color: '#343a40', marginBottom: '1rem' }}>Contact Us</h1>
            <form
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '1rem',
                }}
                onSubmit={handleSubmit}
            >
                <label style={{ fontWeight: '600', fontSize: '14px', color: '#495057' }}>Name:</label>
                <input
                    style={{
                        padding: '0.8rem',
                        border: '1px solid #ced4da',
                        borderRadius: '4px',
                        fontSize: '14px',
                    }}
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Enter your name"
                    onChange={handleChange}
                    required
                />
                <label style={{ fontWeight: '600', fontSize: '14px', color: '#495057' }}>Email:</label>
                <input
                    style={{
                        padding: '0.8rem',
                        border: '1px solid #ced4da',
                        borderRadius: '4px',
                        fontSize: '14px',
                    }}
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter your email"
                    onChange={handleChange}
                    required
                />
                <label style={{ fontWeight: '600', fontSize: '14px', color: '#495057' }}>Phone:</label>
                <input
                    style={{
                        padding: '0.8rem',
                        border: '1px solid #ced4da',
                        borderRadius: '4px',
                        fontSize: '14px',
                    }}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    placeholder="Enter your phone number"
                    onChange={handleChange}
                    required
                />
                <label style={{ fontWeight: '600', fontSize: '14px', color: '#495057' }}>Message:</label>
                <textarea
                    style={{
                        padding: '0.8rem',
                        border: '1px solid #ced4da',
                        borderRadius: '4px',
                        fontSize: '14px',
                        resize: 'vertical',
                        minHeight: '120px',
                    }}
                    name="message"
                    value={formData.message}
                    placeholder="Write your message here..."
                    onChange={handleChange}
                    required
                ></textarea>
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
                    Send
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
}

export default Contact;

import React, { useState, useRef , useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

const PostBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { state: { from: location.pathname } }); // Redirect to login page if token is not present
    }
  }, [navigate, location]);


  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    author: '',
  });
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('');

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', blogData.title);
    formData.append('content', blogData.content);
    formData.append('author', blogData.author);
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/blogs`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response?.status === 201) {
        setBlogData({ title: '', content: '', author: '' });
        setImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';

        // Show success dialog
        //alert('Blog posted successfully!');
        setStatus('Blog Posted successfully!');
      } else {
        //alert('Error posting blog!');
        setStatus('Error posting Blog. Please try again.');
      }
    } catch (error) {
      if (error?.status === 401){
        //alert('Blog posted successfully!');
        setStatus('Access Denied');
        setBlogData({ title: '', content: '', author: '' });
        setImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';

      }
      else{
        console.error(error);
        setBlogData({ title: '', content: '', author: '' });
        setImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';

      //alert('Failed to post the blog.');
      setStatus('Error posting Blog. Please try again.');
      
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
      <h1 style={{ fontSize: '32px', color: '#343a40', marginBottom: '1rem' }}>Post a Blog</h1>
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
            value={blogData.title}
            placeholder="Enter the title of your blog"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={{ fontWeight: '600', fontSize: '14px', color: '#495057' }}>Content:</label>
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
            name="content"
            value={blogData.content}
            placeholder="Write your blog content here..."
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label style={{ fontWeight: '600', fontSize: '14px', color: '#495057' }}>Author:</label>
          <input
            style={{
              padding: '0.8rem',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '14px',
              width: '100%',
            }}
            type="text"
            name="author"
            value={blogData.author}
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={{ fontWeight: '600', fontSize: '14px', color: '#495057' }}>Blog Image:</label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
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
          Post Blog
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

export default PostBlog;

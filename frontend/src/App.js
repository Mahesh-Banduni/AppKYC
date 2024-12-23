// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostJob from './pages/postJob';
import PostBlog from './pages/postBlog';
import Contact from './pages/contact';
import AuthLogin from './pages/authLogin';
import Home from './pages/home';
import About from './pages/about';
import Services from './pages/services';
import Navbar from './pages/navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post-blog" element={<PostBlog />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">My E-Commerce</div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#about">About</a></li>
      </ul>
      <div className="navbar-actions">
        <button className="btn login-btn">Login</button>
        <button className="btn signup-btn">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;

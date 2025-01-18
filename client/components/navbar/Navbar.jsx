import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">The Card Arcade</div>
      <ul className="navbar-links">
        <li><a href="#Games">Games</a></li>
        <li><a href="#TCG">TCG</a></li>
        <li><a href="#Sports">Sports</a></li>
        <li><a href="#About">About</a></li>
        <li><a href="#Contact">Contact</a></li>
      </ul>
      <div className="navbar-actions">
      <Link to="/login">
        <button className="btn login-btn">Login</button>
      </Link>
      <Link to="/signup">
        <button className="btn signup-btn">Sign Up</button>
      </Link>
      </div>
    </nav>
  );
};

export default Navbar;

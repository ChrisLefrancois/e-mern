import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <div className="navbar-brand">The Card Arcade</div>
      </Link>
      <ul className="navbar-links">
        <Link to="/products"><li><div>Products</div></li></Link>
        <Link to="/products/sports"><li><div>Sports</div></li></Link>
        <Link to="/products/tcgs"><li><div>Tcgs</div></li></Link>
        <Link to="/products/videogames"><li><div>Games</div></li></Link>
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

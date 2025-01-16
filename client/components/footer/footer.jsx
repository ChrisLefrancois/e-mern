import React from 'react';
import './Footer.css'; // Import a CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>About The Card Arcade</h4>
        <p>
          Discover the best TCG, sports cards, and retro games at The Card Arcade. Your one-stop shop for collectors and enthusiasts.
        </p>
      </div>
      <div className="footer-section">
        <h4>Customer Service</h4>
        <ul>
          <li><a href="/termsandconditions">Terms and Conditions</a></li>
          <li><a href="/shippingpolicy">Shipping Policy</a></li>
          <li><a href="/returnpolicy">Return Policy</a></li>
          <li><a href="/privacypolicy">Privacy Policy</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Connect With Us</h4>
        <ul className="social-media">
          <li><a href="https://facebook.com" aria-label="Facebook"><FontAwesomeIcon icon={faFacebook} /></a></li>
          <li><a href="https://twitter.com" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a></li>
          <li><a href="https://instagram.com" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a></li>
        </ul>
      </div>
      <div className="footer-section">
        <form>
          <h4>Subscribe to Our Newsletter</h4>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div className="footer-bottom">
        <p>
          © 2025 The Card Arcade. All rights reserved. | <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

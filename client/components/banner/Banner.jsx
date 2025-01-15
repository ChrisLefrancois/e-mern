import React from 'react';
import './Banner.css';  // Make sure to create a separate CSS file or use inline styles

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h1 className="headline">Welcome to The Card Arcade!</h1>
        <p className="subline">Browse our collection of rare cards and vintage games!</p>
        <a href="#shop" className="cta-button">Shop Now</a>
      </div>
    </div>
  );
}

export default Banner;

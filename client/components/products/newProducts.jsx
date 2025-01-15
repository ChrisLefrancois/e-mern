import React from 'react';
import './NewProducts.css'; // Ensure you create the styles

const NewProduct = () => {
  return (
    <div className="new-product-section">
      <h2 className="new-product-title">New Arrivals: Rare Collectible Card</h2>
      <div className="new-product-content">
        <img src="https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=600&type=card" alt="Rare Collectible Card" className="new-product-image" />
        <div className="new-product-info">
          <p className="product-description">
            Discover our latest collectible card – a limited edition gem for any TCG enthusiast!
          </p>
          <a href="#shop" className="cta-button">Buy Now</a>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;

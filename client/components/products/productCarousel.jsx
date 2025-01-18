import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import 'swiper/swiper-bundle.css';
import './ProductCarousel.css';

const ProductCarousel = ({ title, products }) => {
  return (
    <div className="product-carousel">
      <h2 className="carousel-title">{title}</h2>
      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        navigation
        loop
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-name">{product.name}</div>
              <div className="divroduct-price">${product.price.toFixed(2)}</div>
              <div className="product-actions">
                <button href="#" className="product-link">
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button className="product-cart-button">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// Define prop types
ProductCarousel.propTypes = {
  title: PropTypes.string.isRequired, // 'title' should be a required string
  products: PropTypes.arrayOf(       // 'products' should be an array of objects
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired
};

export default ProductCarousel;

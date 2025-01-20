import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SingleProductPage.css';

const SingleProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    // Implement the add to cart functionality here
    console.log(`Added ${quantity} of ${product.name} to the cart`);
  };


  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="single-product-page">
      {product && (
        <div className="product-container">
          <div className="product-image-wrapper">
            <img
              src={product.image || 'https://via.placeholder.com/300'}
              alt={product.name}
              className="product-image"
            />
          </div>
          <div className="product-details">
            <h1 className="product-name">{product.name}</h1>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-description">{product.description}</p>

            {product.type === 'card' && (
              <>
                <p><strong>Type:</strong> {product.cardType}</p>
                <p><strong>Graded:</strong> {product.isGraded ? 'Yes' : 'No'}</p>
                {product.cardType === 'sport' && <p><strong>Sport:</strong> {product.sport}</p>}
                {product.cardType === 'tcg' && <p><strong>Set:</strong> {product.set}</p>}
              </>
            )}

            {product.videoGameDetails && (
              <>
                <p><strong>Console:</strong> {product.videoGameDetails.console.name}</p>
                <p><strong>Genre:</strong> {product.videoGameDetails.genre.name}</p>
              </>
            )}

<div className="quantity-cart">
              <input
                type="number"
                value={quantity}
                min="1"
                max={product.stock}
                onChange={handleQuantityChange}
                className="quantity-input"
              />
              <button onClick={handleAddToCart} className="add-to-cart-button">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductPage;

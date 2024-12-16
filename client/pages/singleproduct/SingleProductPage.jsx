import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SingleProductPage.css';

const SingleProductPage = () => {
  const { id } = useParams(); // Retrieve the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="single-product-page">
      {product && (
        <>
          <img
            src={product.image || 'https://via.placeholder.com/300'}
            alt={product.name}
            className="product-image"
          />
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>

          {/* Add details specific to product type */}
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
          <p>Console: {product.videoGameDetails.console.name}</p>
          <p>Genre: {product.videoGameDetails.genre.name}</p>
        </>
      )}
        </>
      )}
    </div>
  );
};

export default SingleProductPage;

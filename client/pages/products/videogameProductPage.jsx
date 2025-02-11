import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './ProductsPage.css';

const VideoGameProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideoGamesProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        const sportsProducts = response.data.products.filter(
          product => product.type === 'video_game'
        );
        setProducts(sportsProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch sports products.');
        setLoading(false);
      }
    };

    fetchVideoGamesProducts();
  }, []);
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-page">
      <h1>Video Games</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img
              src={product.image || 'https://via.placeholder.com/150'}
              alt={product.name}
              className="product-page-image"
            />
            <div className="product-name">{product.name}</div>
            <div className="product-price">${product.price.toFixed(2)}</div>
            <div className="product-actions">
              <button href="#" className="product-link">
                <FontAwesomeIcon icon={faEye} />
              </button>
              <button className="product-cart-button">
                <FontAwesomeIcon icon={faShoppingCart} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGameProductPage;

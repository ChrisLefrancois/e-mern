import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './ProductsPage.css';
import { Link } from 'react-router-dom';


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
       <div className="products-type">
        <h1>Video Games</h1>
      </div>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
          <Link to={`/products/${product._id}`}>
            <img
              src={product.image || 'https://via.placeholder.com/150'}
              alt={product.name}
              className="product-page-image"
            />
          </Link>
            <Link to={`/products/${product._id}`} className="product-name">
              {product.name}
            </Link>
            <div className="product-price">${product.price.toFixed(2)}</div>
            <div className="product-actions">
            <Link to={`/products/${product._id}`} className="product-link">
              <button><FontAwesomeIcon icon={faEye} /></button>
            </Link>
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

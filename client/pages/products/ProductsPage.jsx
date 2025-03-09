import { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products?page=${currentPage}&limit=${productsPerPage}`
        );
        setProducts(response.data.products);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="product-page">
      <div className="products-type">
        <h1>All Products</h1>
      </div>
      <div className="product-grid">
        {products.map((product) => (
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
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`Page ${currentPage}`}</span>
        <button
          className="pagination-button"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductPage;

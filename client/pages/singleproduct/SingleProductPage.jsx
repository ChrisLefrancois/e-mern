import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '/context/CartContext';
import './SingleProductPage.css';

const SingleProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data.product);
        setRelatedProducts(response.data.relatedProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity(prev => (prev < product.quantity ? prev + 1 : product.quantity));
  };

  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value, 10);

    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else if (value > product.quantity) {
      setQuantity(product.quantity);
    } else {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity); // Call addToCart from context
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
              className="product-image-show"
            />
          </div>
          <div className="product-details">
            <h1 className="product-name">{product.name}</h1>
            <p className="product-price-show">${product.price.toFixed(2)}</p>

            {product.type === 'video_game' && (
              <>
                <p><strong>product type:</strong> Video Game</p>
              </>
            )}

            {product.type === 'card' && (
              <>
                <p><strong>Type:</strong> {product.cardDetails.category}</p>
                <p><strong>Graded:</strong> {product.isGraded ? 'Yes' : 'No'}</p>
                {product.cardDetails.category === 'sport' && product.cardDetails.sport && (
                  <p><strong>Sport:</strong> {product.cardDetails.sport.name}</p>
                )}
                {product.cardDetails.category === 'tcg' && product.cardDetails.set && (
                  <p><strong>Set:</strong> {product.cardDetails.set.name}</p>
                )}
              </>
            )}

            {product.type === "video_game" && (
              <>
                <p><strong>Console:</strong> {product.videoGameDetails.console.name}</p>
                <p><strong>Genre:</strong> {product.videoGameDetails.genre.name}</p>
              </>
            )}

            <p className="product-stock">Hurry! Only <span>{product.quantity}</span> units left in stock!</p>
            <div className="stock-bar">
              <div className="stock-fill" style={{ width: `${(product.quantity / 30) * 100}%` }}></div>
            </div>

            <div className="quantity-cart">
            <div className="quantity-selector">
              <button onClick={decreaseQuantity} className="quantity-btn">-</button>
              <input
                type="text"
                value={quantity}
                min="1"
                max={product.quantity}
                onChange={handleQuantityChange}
                className="quantity-input"
              />
              <button onClick={increaseQuantity} className="quantity-btn">+</button>
            </div>
              <button onClick={handleAddToCart} className="add-to-cart-button">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      <h1>You may also like</h1>

      <div className="related-products">
        <div className="related-products-list">
          {relatedProducts.map((relatedProduct) => (
            <div className="related-product" key={relatedProduct._id}>
              <img
                src={relatedProduct.image || 'https://via.placeholder.com/150'}
                alt={relatedProduct.name}
                className="related-product-image"
              />
              <p>{relatedProduct.name}</p>
              <p>${relatedProduct.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;

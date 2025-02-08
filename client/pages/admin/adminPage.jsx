import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '/components/api'

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    type: '',
    videoGameDetails: { console: '', genre: '' },
    cardDetails: { category: '', sport: '', game: '', set: '', isGraded: false },
  });

  useEffect(() => {
    console.log(localStorage.getItem('jwtToken'))
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleDetailsChange = (e, category) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [category]: { ...prevProduct[category], [name]: value },
    }));
  };

  const handleAddProduct = async () => {
    try {
      const response = await api.post('/api/products/create', newProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProducts([...products, response.data]);
      setNewProduct({
        name: '',
        price: '',
        quantity: '',
        type: '',
        videoGameDetails: { console: '', genre: '' },
        cardDetails: { category: '', sport: '', game: '', set: '', isGraded: false },
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`/api/products/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>

      <h2>Add Product</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newProduct.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={newProduct.price}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="quantity"
        placeholder="Quantity"
        value={newProduct.quantity}
        onChange={handleInputChange}
      />
      <select name="type" value={newProduct.type} onChange={handleInputChange}>
        <option value="">Select Type</option>
        <option value="video_game">Video Game</option>
        <option value="card">Card</option>
      </select>

      {newProduct.type === 'video_game' && (
        <>
          <input
            type="text"
            name="console"
            placeholder="Console"
            value={newProduct.videoGameDetails.console}
            onChange={(e) => handleDetailsChange(e, 'videoGameDetails')}
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={newProduct.videoGameDetails.genre}
            onChange={(e) => handleDetailsChange(e, 'videoGameDetails')}
          />
        </>
      )}

      {newProduct.type === 'card' && (
        <>
          <select
            name="category"
            value={newProduct.cardDetails.category}
            onChange={(e) => handleDetailsChange(e, 'cardDetails')}
          >
            <option value="">Select Category</option>
            <option value="tcg">TCG</option>
            <option value="sport">Sport</option>
          </select>
          {newProduct.cardDetails.category === 'sport' && (
            <input
              type="text"
              name="sport"
              placeholder="Sport"
              value={newProduct.cardDetails.sport}
              onChange={(e) => handleDetailsChange(e, 'cardDetails')}
            />
          )}
          {newProduct.cardDetails.category === 'tcg' && (
            <>
              <input
                type="text"
                name="game"
                placeholder="Game"
                value={newProduct.cardDetails.game}
                onChange={(e) => handleDetailsChange(e, 'cardDetails')}
              />
              <input
                type="text"
                name="set"
                placeholder="Set"
                value={newProduct.cardDetails.set}
                onChange={(e) => handleDetailsChange(e, 'cardDetails')}
              />
            </>
          )}
          <label>
            <input
              type="checkbox"
              name="isGraded"
              checked={newProduct.cardDetails.isGraded}
              onChange={(e) =>
                handleDetailsChange(
                  { target: { name: 'isGraded', value: e.target.checked } },
                  'cardDetails'
                )
              }
            />
            Is Graded
          </label>
        </>
      )}

      <button onClick={handleAddProduct}>Add Product</button>

      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price} - {product.quantity} units
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    type: '',
  });

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post('/api/products/add', newProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProducts([...products, response.data]);
      setNewProduct({ name: '', price: '', quantity: '', type: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/delete/${id}`, {
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
      <input
        type="text"
        name="type"
        placeholder="Type"
        value={newProduct.type}
        onChange={handleInputChange}
      />
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

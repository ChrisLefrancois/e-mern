import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router';
import Navbar from '/components/navbar/Navbar';
import Signup from '/pages/signup/Signup';
import Login from '/pages/login/Login';
import ProductsPage from '/pages/products/ProductsPage';
import SingleProductPage from '/pages/singleproduct/SingleProductPage';

const HomePage = () => {
  return (
    <div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<SingleProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;

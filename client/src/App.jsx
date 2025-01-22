import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router';
import Navbar from '/components/navbar/Navbar';
import Footer from '/components/footer/Footer';
import Signup from '/pages/signup/Signup';
import Login from '/pages/login/Login';
import ProductsPage from '/pages/products/ProductsPage';
import SportsProductPage from '/pages/products/sportProductPage';
import VideoGamesProductPage from '/pages/products/videogameProductPage';
import TcgsProductPage from '/pages/products/tcgProductPage';
import SingleProductPage from '/pages/singleproduct/SingleProductPage';
import AdminPage from '/pages/admin/adminPage';
import HomePage from '/pages/home/homePage';
import { AuthProvider } from '../context/AuthContext';
import PrivateRoute from '../components/PrivateRoute';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/sports" element={<SportsProductPage />} />
          <Route path="/products/tcgs" element={<TcgsProductPage />} />
          <Route path="/products/videogames" element={<VideoGamesProductPage />} />
          <Route path="/products/:id" element={<SingleProductPage />} />
          <Route
            path="/admin"
            element={<AdminPage />}
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;

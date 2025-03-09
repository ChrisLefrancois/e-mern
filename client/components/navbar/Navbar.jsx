import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth for checking user status
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Import cart icon
import './Navbar.css';

const Navbar = () => {
  const { user, logOut } = useAuth(); // Access user and logOut from context

  return (
    <nav className="navbar">
      <Link to="/">
        <div className="navbar-brand">The Card Arcade</div>
      </Link>
      <ul className="navbar-links">
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/products/sports">Sports</Link></li>
        <li><Link to="/products/tcgs">Tcgs</Link></li>
        <li><Link to="/products/videogames">Games</Link></li>
        <li><a href="#About">About</a></li>
        <li><a href="#Contact">Contact</a></li>
      </ul>
      <div className="navbar-actions">
        {!user ? (
          <>
            <Link to="/login">
              <button className="btn login-btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn signup-btn">Sign Up</button>
            </Link>
          </>
        ) : (
          <>
            {/* Cart Icon Link */}
            <Link to="/cart" className="cart-icon">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </Link>
            <button className="btn logout-btn" onClick={logOut}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

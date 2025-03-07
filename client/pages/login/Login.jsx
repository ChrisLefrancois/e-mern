import { useState } from 'react';
import axios from 'axios';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);

      // Make sure to access the token from response.data
      const token = response.data.token;

      if (!token) {
        throw new Error("Token not received from server.");
      }

      // Store the token in localStorage for persistence
      localStorage.setItem('jwtToken', token);

      setMessage('Login successful!');
      setFormData({ email: '', password: '' }); // Clear the form
    } catch (error) {
      console.error("Login error:", error);
      const errorMsg = error.response?.data?.message || 'An error occurred during login.';
      setMessage(errorMsg);
    }
  };
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;

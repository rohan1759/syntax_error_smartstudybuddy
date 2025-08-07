import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // (optional: create and style)

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const user = {
    email: "hello@gmail.com",
    password: "12345678"
  }

  const navigate = useNavigate(); // for redirection

  const handleClick = () => {
    // Redirect to home page after login
    if(email === user.email && password === user.password) {
      localStorage.setItem('isLoggedIn', true); // store login state
      navigate('/home');
    }else {
      setError('Invalid email or password.');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple frontend validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Example hardcoded auth (replace with real API call)
    if (email === 'hello@gmail.com' && password === '12345678') {
      setError('');
      localStorage.setItem('isLoggedIn', true); // store login state
      navigate('/home'); // redirect to homepage or dashboard
    } else {
      setError('Invalid email or password.');
      alert('Invalid email or password.'); // alert for invalid login
      setEmail(''); // clear email input
      setPassword(''); // clear password input
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="login-btn" onClick={handleClick}>Login</button>
      </form>
    </div>
  );
};

export default Login;

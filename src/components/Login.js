import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/authenticate', {
        mobile_number: mobileNumber
      });

      if (response.data.success) {
        onLogin(response.data.user);
      } else {
        setError('User not found. Please check your mobile number.');
      }
    } catch (err) {
      console.error('Error during authentication:', err);
      setError('An error occurred during authentication. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>🔐 Login</h2>
      <input
        type="text"
        placeholder="Enter your mobile number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Login;

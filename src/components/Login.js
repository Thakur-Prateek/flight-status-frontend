import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(`Sending request with mobile number: ${mobileNumber}`);
      const response = await axios.post('http://localhost:3001/authenticate', {
        mobile_number: mobileNumber
      });

      console.log('Response received:', response);

      if (response.data.success) {
        onLoginSuccess(response.data.user);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Error during authentication:', err);
      console.error('Error response:', err.response);
      setError('Error during authentication');
    }
  };

  return (
    <div className="login-container">
      <h2>Onboard</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your mobile number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;

// src/App.js
import React from 'react';
import Login from './Login';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000'; // Update with your backend server URL

const App = () => {
  return (
    <div className="App">
      <Login />
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import FlightDetails from './components/FlightDetails';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const handleLoginSuccess = (user) => {
    console.log('Login successful, user:', user);
    setUser(user);
  };

  return (
    <div className="App">
      <header className="header">
        Indigo Airlines Flight Status
        <div className="switch">
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </header>
      <div className="container">
        {!user ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <FlightDetails user={user} />
        )}
      </div>
      <footer className="footer">
        &copy; {new Date().getFullYear()} Indigo Airlines. All rights reserved.
      </footer>
    </div>
  );
};

export default App;

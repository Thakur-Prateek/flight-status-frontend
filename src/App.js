import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import FlightDetails from './components/FlightDetails';
import NotificationSettings from './components/NotificationSettings';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <div className="App">
      <header className="header">
        Flight Status Notification System
      </header>
      <div className="container">
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <FlightDetails userId={user.id} />
            <NotificationSettings userId={user.id} />
          </>
        )}
      </div>
      <footer className="footer">
        &copy; 2024 Indigo Airlines
      </footer>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import Login from './components/Login';
import FlightDetails from './components/FlightDetails';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (user) => {
    console.log('Login successful, user:', user);
    setUser(user);
  };

  return (
    <div className="App">
      {!user ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <FlightDetails user={user} />
      )}
    </div>
  );
};

export default App;

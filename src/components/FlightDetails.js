import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotificationSettings from './NotificationSettings';

const FlightDetails = ({ user }) => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/flights/${user.id}`);
        console.log('Flight details response:', response);

        if (response.data.success) {
          setFlights(response.data.flights);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error('Error fetching flight details:', err);
        setError('Error fetching flight details');
      }
    };

    fetchFlights();
  }, [user.id]);

  return (
    <div className="flight-details">
      <h2>Flight Details</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {flights.map(flight => (
          <li key={flight.id}>
            <p>Flight Number: {flight.flight_number}</p>
            <p>Departure Time: {new Date(flight.departure_time).toLocaleString()}</p>
            <p>Arrival Time: {new Date(flight.arrival_time).toLocaleString()}</p>
            <p>Status: {flight.status}</p>
            <p>Gate: {flight.gate}</p>
            <p>Terminal: {flight.terminal}</p>
          </li>
        ))}
      </ul>
      <NotificationSettings user={user} />
    </div>
  );
};

export default FlightDetails;

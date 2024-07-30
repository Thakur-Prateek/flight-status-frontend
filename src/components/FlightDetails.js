import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FlightDetails = ({ userId }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/flights/${userId}`);
        if (response.data.success) {
          setFlights(response.data.flights);
        }
      } catch (err) {
        console.error('Error fetching flight details:', err);
      }
    };

    fetchFlightDetails();
  }, [userId]);

  return (
    <div className="flight-details">
      <h2>Flight Details</h2>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
           <div className="flight-info">
              <span>🔢</span> Flight Number: {flight.flight_number}
              <br />
              <span>🛫</span> Departure Time: {flight.departure_time}
              <br />
              <span>🛬</span> Arrival Time: {flight.arrival_time}
              <br />
              <span>📅</span> Status: {flight.status}
              <br />
              <span>🛤️</span> Gate: {flight.gate}
              <br />
              <span>🏢</span> Terminal: {flight.terminal}
              <br />
              <span>📍</span> Destination: {flight.destination}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightDetails;

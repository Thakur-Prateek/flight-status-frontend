// src/Preferences.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Preferences = ({ userId }) => {
  const [preferences, setPreferences] = useState({
    email: '',
    sms: '',
    whatsapp: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(`/preferences/${userId}`);
        setPreferences(response.data.preferences || {});
      } catch (error) {
        console.error(error);
        setMessage('Error fetching preferences');
      }
    };
    fetchPreferences();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/update-preferences', { userId, preferences });
      setMessage('Preferences updated successfully');
    } catch (error) {
      console.error(error);
      setMessage('Error updating preferences');
    }
  };

  return (
    <div>
      <h2>Notification Preferences</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={preferences.email} onChange={handleChange} />
        </div>
        <div>
          <label>SMS:</label>
          <input type="text" name="sms" value={preferences.sms} onChange={handleChange} />
        </div>
        <div>
          <label>WhatsApp:</label>
          <input type="text" name="whatsapp" value={preferences.whatsapp} onChange={handleChange} />
        </div>
        <button type="submit">Update Preferences</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Preferences;

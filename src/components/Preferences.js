// src/Preferences.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';

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
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5">Notification Preferences</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="email"
          name="email"
          label="Email"
          value={preferences.email}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="text"
          name="sms"
          label="SMS"
          value={preferences.sms}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="text"
          name="whatsapp"
          label="WhatsApp"
          value={preferences.whatsapp}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">Update Preferences</Button>
      </Box>
      <Typography variant="body1" color="error">{message}</Typography>
    </Box>
  );
};

export default Preferences;

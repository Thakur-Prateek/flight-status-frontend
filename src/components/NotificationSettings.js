import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationSettings = ({ userId }) => {
  const [settings, setSettings] = useState({
    notify_sms: false,
    notify_email: false,
    notify_whatsapp: false,
  });

  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/notifications/${userId}`);
        if (response.data.success) {
          setSettings(response.data.notification);
        }
      } catch (err) {
        console.error('Error fetching notification settings:', err);
      }
    };

    fetchNotificationSettings();
  }, [userId]);

  const handleSaveSettings = async () => {
    try {
      await axios.post(`http://localhost:3001/notifications/${userId}`, settings);
      alert('Settings saved successfully.');
    } catch (err) {
      console.error('Error saving notification settings:', err);
      alert('An error occurred while saving settings. Please try again.');
    }
  };

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className="notification-settings">
      <h2>🔔Notification Settings</h2>
      <label>
        <input
          type="checkbox"
          name="notify_sms"
          checked={settings.notify_sms}
          onChange={handleChange}
        />
        SMS Notifications
      </label>
      <label>
        <input
          type="checkbox"
          name="notify_email"
          checked={settings.notify_email}
          onChange={handleChange}
        />
        Email Notifications
      </label>
      <label>
        <input
          type="checkbox"
          name="notify_whatsapp"
          checked={settings.notify_whatsapp}
          onChange={handleChange}
        />
        WhatsApp Notifications
      </label>
      <button className="save-settings" onClick={handleSaveSettings}>
        💾Save Settings
      </button>
    </div>
  );
};

export default NotificationSettings;

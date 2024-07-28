import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationSettings = ({ user }) => {
  const [notifySMS, setNotifySMS] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState(false);
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(false);
  const [notifyBrowser, setNotifyBrowser] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/notifications/${user.id}`);
        if (response.data.success) {
          const { notify_sms, notify_email, notify_whatsapp, notify_browser } = response.data.notification;
          setNotifySMS(notify_sms);
          setNotifyEmail(notify_email);
          setNotifyWhatsApp(notify_whatsapp);
          setNotifyBrowser(notify_browser);
        }
      } catch (err) {
        console.error('Error fetching notification settings:', err);
      }
    };
    fetchNotificationSettings();
  }, [user.id]);

  const handleSave = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/notifications/${user.id}`, {
        notify_sms: notifySMS,
        notify_email: notifyEmail,
        notify_whatsapp: notifyWhatsApp,
        notify_browser: notifyBrowser
      });
      if (response.data.success) {
        setMessage('Notification settings updated successfully');
      } else {
        setMessage('Failed to update notification settings');
      }
    } catch (err) {
      console.error('Error updating notification settings:', err);
      setMessage('Error updating notification settings');
    }
  };

  return (
    <div className="notification-settings">
      <h2>Notification Settings</h2>
      <div>
        <label>
          <input
            type="checkbox"
            checked={notifySMS}
            onChange={() => setNotifySMS(!notifySMS)}
          />
          SMS Notifications
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={notifyEmail}
            onChange={() => setNotifyEmail(!notifyEmail)}
          />
          Email Notifications
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={notifyWhatsApp}
            onChange={() => setNotifyWhatsApp(!notifyWhatsApp)}
          />
          WhatsApp Notifications
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={notifyBrowser}
            onChange={() => setNotifyBrowser(!notifyBrowser)}
          />
          Browser Notifications
        </label>
      </div>
      <button onClick={handleSave}>Save Settings</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NotificationSettings;

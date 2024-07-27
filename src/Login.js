// src/Login.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import axios from 'axios';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [message, setMessage] = useState('');
  const [flightDetails, setFlightDetails] = useState(null);
  const [preferences, setPreferences] = useState(null);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        onSignInSubmit();
      }
    }, auth);
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    setupRecaptcha();
    const phoneNumberWithCode = `+91${phoneNumber}`; // Change country code as needed
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumberWithCode, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        setMessage('OTP sent to your phone');
      }).catch((error) => {
        console.error(error);
        setMessage('Failed to send OTP');
      });
  };

  const onVerifyOtpSubmit = (e) => {
    e.preventDefault();
    const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
    auth.signInWithCredential(credential)
      .then((result) => {
        setMessage('User signed in successfully');
        const userId = result.user.uid;
        fetchFlightDetails(userId);
        fetchPreferences(userId);
      }).catch((error) => {
        console.error(error);
        setMessage('Failed to sign in');
      });
  };

  const fetchFlightDetails = async (userId) => {
    try {
      const response = await axios.get(`/flight-details/${userId}`);
      setFlightDetails(response.data);
    } catch (error) {
      console.error(error);
      setMessage('Error fetching flight details');
    }
  };

  const fetchPreferences = async (userId) => {
    try {
      const response = await axios.get(`/preferences/${userId}`);
      setPreferences(response.data);
    } catch (error) {
      console.error(error);
      setMessage('Error fetching preferences');
    }
  };

  return (
    <div>
      <h1>Onboard</h1>
      <form onSubmit={onSignInSubmit}>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your mobile number"
          required
        />
        <button type="submit">Send OTP</button>
      </form>
      <form onSubmit={onVerifyOtpSubmit}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
      <div id="recaptcha-container"></div>
      <p>{message}</p>
      {flightDetails && (
        <div>
          <h2>Flight Details</h2>
          <p>Flight ID: {flightDetails.flight_id}</p>
          <p>Status: {flightDetails.status}</p>
          {/* Add more details as needed */}
        </div>
      )}
      {preferences && (
        <div>
          <h2>Notification Preferences</h2>
          <p>Email: {preferences.email}</p>
          <p>SMS: {preferences.sms}</p>
          {/* Add more preferences as needed */}
        </div>
      )}
    </div>
  );
};

export default Login;

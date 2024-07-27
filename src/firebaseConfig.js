// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvt4CmXepvde7CFctiu7iwNl5a8c_oEqg",
  authDomain: "indigo-notification-app.firebaseapp.com",
  projectId: "indigo-notification-app",
  storageBucket: "indigo-notification-app.appspot.com",
  messagingSenderId: "85358061684",
  appId: "1:85358061684:web:5ee9b30f2291f9059cc921",
  measurementId: "G-Z45M5H8XXQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
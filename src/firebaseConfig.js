import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvt4CmXepvde7CFctiu7iwNl5a8c_oEqg",
  authDomain: "indigo-notification-app.firebaseapp.com",
  projectId: "indigo-notification-app",
  storageBucket: "indigo-notification-app.appspot.com",
  messagingSenderId: "85358061684",
  appId: "1:85358061684:web:5ee9b30f2291f9059cc921",
  measurementId: "G-Z45M5H8XXQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

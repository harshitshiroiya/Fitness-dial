// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTq32a7KQJm7j08b0H4Z9n8aZE1EpzVP0",
  authDomain: "fitness-dial.firebaseapp.com",
  databaseURL: "https://fitness-dial-default-rtdb.firebaseio.com",
  projectId: "fitness-dial",
  storageBucket: "fitness-dial.appspot.com",
  messagingSenderId: "119258868163",
  appId: "1:119258868163:web:c0ccd6b84c9d38c6893576",
  measurementId: "G-MKNC03TJ26"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
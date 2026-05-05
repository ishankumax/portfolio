// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlFbLNEbOq8ePgPDXa7XX9HmCeEL7vBQg",
  authDomain: "portfolio-kumax.firebaseapp.com",
  projectId: "portfolio-kumax",
  storageBucket: "portfolio-kumax.firebasestorage.app",
  messagingSenderId: "966264822556",
  appId: "1:966264822556:web:98655db2032019af6a78d9",
  measurementId: "G-7P8G35DHDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQT4r0CWb5_tRBnb6lHgZqJRVzEI4yhI0",
  authDomain: "budgetbuddy-2d56e.firebaseapp.com",
  projectId: "budgetbuddy-2d56e",
  storageBucket: "budgetbuddy-2d56e.appspot.com",
  messagingSenderId: "1001389927434",
  appId: "1:1001389927434:web:a5505b499b7212a9b703f3",
  measurementId: "G-PLBDK8RRMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

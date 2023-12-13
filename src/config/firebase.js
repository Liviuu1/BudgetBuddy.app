// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwGlVBGKB-s__qfmh63kkYzGx5HmjfLaM",
  authDomain: "budget-buddy-72f08.firebaseapp.com",
  projectId: "budget-buddy-72f08",
  storageBucket: "budget-buddy-72f08.appspot.com",
  messagingSenderId: "811552232729",
  appId: "1:811552232729:web:1328cb803383379ac3a188",
  measurementId: "G-1GMTWLVDFB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

import React, { useState, useEffect } from "react";
import { auth, db, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { GoogleLogo, SignOut, SignIn, UserPlus } from "@phosphor-icons/react";
import { collection, doc, setDoc } from "firebase/firestore";

function Header() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const accountsCollectionRef = collection(db, "accountsCollection");

  // console.log(auth?.currentUser?.email);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []); // Run this effect only once during component mount

  console.log(user?.email);

  const signUp = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Access the newly created user
      const user = userCredential.user;

      // Define the initial account data for the new user
      const newAccount = {
        owner: user.email,
        currency: "EUR",
        locale: "pt-PT",
        movements: {
          movement1: [new Date().toISOString(), 0],
        },
        interestRate: 1.2,
        // Add other properties as needed (e.g., interestRate)
      };

      // Add the new account to the "accountsCollection" in Firestore
      await setDoc(doc(accountsCollectionRef, user.uid), newAccount);

      // Log the user in
      // You may want to redirect the user or perform additional actions after sign up
      console.log("User signed up:", user.email);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithEmail = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogoClick = () => {
    // Reload the entire page
    window.location.reload();
  };
  return (
    <nav>
      <p className="welcome">Log in to get started</p>
      <img
        src="/images/logo.png"
        alt="Logo"
        className="logo"
        onClick={handleLogoClick}
      />
      <form className="login">
        {!user && (
          <>
            <input
              type="email"
              placeholder="Email"
              className="login__input login__input--user"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="login__input login__input--pin"
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}
        {!user ? (
          <button
            type="submit"
            onClick={signInWithEmail}
            className="login__btn"
            title="Log In With Email and Password"
          >
            <SignIn size={32} />
          </button>
        ) : null}
        {!user ? (
          <button
            type="button"
            className="login__btn"
            onClick={signUp}
            title="Sign Up"
          >
            <UserPlus size={32} />
          </button>
        ) : null}
        {!user ? (
          <button
            className="login__btn"
            type="button"
            onClick={signInWithGoogle}
            title="Sign In With Google"
          >
            <GoogleLogo size={32} />
          </button>
        ) : null}
        {user ? (
          <button className="login__btn" onClick={logout} title="Log Out">
            <SignOut size={32} />
          </button>
        ) : null}
      </form>
    </nav>
  );
}

export default Header;

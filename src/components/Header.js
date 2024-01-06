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
import { Timestamp, collection, doc, getDoc, setDoc } from "firebase/firestore";

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

      // Check if the user already exists in the database
      const userDocRef = doc(accountsCollectionRef, user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Determine the user's currency based on the browser's language
        const browserCurrency = new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "EUR", // Default to EUR if unable to determine
        }).resolvedOptions().currency;

        // Determine the user's locale based on the browser's language
        const browserLocale = navigator.language;

        // If the user does not exist, add them to the database
        const newAccount = {
          owner: user.email,
          currency: browserCurrency,
          locale: browserLocale || "en-US", // Default to en-US if unable to determine
          movements: {
            movement1: [Timestamp.fromDate(new Date()), 0],
          },
          interestRate: 1.2,
          // Add other properties as needed (e.g., interestRate)
        };

        // Add the new account to the "accountsCollection" in Firestore
        await setDoc(userDocRef, newAccount);
      }

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
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if the user already exists in the database
      const userDocRef = doc(accountsCollectionRef, user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Determine the user's currency based on the browser's language
        const browserCurrency = new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "EUR", // Default to EUR if unable to determine
        }).resolvedOptions().currency;

        // Determine the user's locale based on the browser's language
        const browserLocale = navigator.language;

        // If the user does not exist, add them to the database
        const newAccount = {
          owner: user.email,
          currency: browserCurrency,
          locale: browserLocale || "en-US", // Default to en-US if unable to determine
          movements: {
            movement1: [Timestamp.fromDate(new Date()), 0],
          },
          interestRate: 1.2,
          // Add other properties as needed (e.g., interestRate)
        };

        // Add the new account to the "accountsCollection" in Firestore
        await setDoc(userDocRef, newAccount);
      }

      // Log the user in
      // You may want to redirect the user or perform additional actions after sign in
      console.log("User signed in with Google:", user.email);
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

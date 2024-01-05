import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { GoogleLogo, SignOut, SignIn } from "@phosphor-icons/react";

function Header() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <nav>
      <p className="welcome">Log in to get started</p>
      <img src="/images/logo.png" alt="Logo" className="logo" />
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
          <button type="submit" onClick={signIn} className="login__btn">
            <SignIn size={32} />
          </button>
        ) : null}
        {!user ? (
          <button
            className="login__btn"
            type="button"
            onClick={signInWithGoogle}
          >
            <GoogleLogo size={32} />
          </button>
        ) : null}
        {user ? (
          <button className="login__btn" onClick={logout}>
            <SignOut size={32} />
          </button>
        ) : null}
      </form>
    </nav>
  );
}

export default Header;

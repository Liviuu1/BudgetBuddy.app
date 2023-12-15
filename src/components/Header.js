import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

function Header() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 // console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try{
      await createUserWithEmailAndPassword(auth, email, password);
    }catch(err){
      console.error(err);
    }
    
  };

  const signInWithGoogle = async () => {
    try{
      await signInWithPopup(auth,  googleProvider);
    }catch(err){
      console.error(err);
    }
    
  };

  const logout = async () => {
    try{
      await signOut(auth);
    }catch(err){
      console.error(err);
    }
    
  };

  return (
    <nav>
      <p className="welcome">Log in to get started</p>
      <img src="/images/logo.png" alt="Logo" className="logo" />
      <form className="login">
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
        
        <button onClick={signIn} className="login__btn">
          →
        </button>

        <button onClick={signInWithGoogle}>Sign In With Google </button>
        
        <button onClick={logout}>Logout</button>
      </form>
    </nav>
  );
}

export default Header;

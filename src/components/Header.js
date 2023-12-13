import React, { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
function Header() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);

  const signIn = async () => {
    console.log(email, password);
    await createUserWithEmailAndPassword(auth, email, password);
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
      </form>
    </nav>
  );
}

export default Header;

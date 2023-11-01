import React from "react";

function Header() {
  return (
    <nav>
      <p className="welcome">Log in to get started</p>
      <img src="/images/logo.png" alt="Logo" className="logo" />
      <form className="login">
        <input
          type="text"
          placeholder="user"
          className="login__input login__input--user"
        />
        <input
          type="password"
          placeholder="PIN"
          maxLength={4}
          className="login__input login__input--pin"
        />
        <button className="login__btn">→</button>
      </form>
    </nav>
  );
}

export default Header;

import React from 'react';

function Navigation()
{
    return (
        <nav>
      <p className="welcome">Log in to get started</p>
      <img src="logo.png" alt="Logo" className="logo" />
      <form className="login">
        <input type="text" placeholder="user" className="login_input login_input--user" />
        {/* Other login inputs and buttons */}
      </form>
    </nav>
    );
}


export default Navigation;
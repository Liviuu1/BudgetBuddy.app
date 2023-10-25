import React from "react";
import "./App.css";
import Login from "./Components/Login"; // Import the Login component
import Firebase from "./Components/Firebase";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login /> {/* Use the Login component here */}
        <Firebase/>
        <></>
      </header>
    </div>
  );
}

export default App;
import "./style.css";
import Header from "./components/Header";
import Balance from "./components/Balance";
import Movements from "./components/Movements";
import Summary from "./components/Summary";
import Transfers from "./components/Transfers";
import Loan from "./components/Loan";
import Close from "./components/Close";
import LogoutTimer from "./components/LogoutTimer";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "./config/firebase";
export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleTimeout = () => {
    // Perform logout or other actions when the timer reaches 0
    console.log("Timeout reached. Logging out...");
    // Add your logout logic here
  };

  return (
    <>
      <Header />
      {user && (
        <main className="app">
          {/* BALANCE */}
          <Balance />
          {/* MOVEMENTS */}
          <Movements />
          {/* SUMMARY */}
          <Summary />
          {/* OPERATION: TRANSFERS */}
          <Transfers />
          {/* OPERATION: LOAN */}
          <Loan />
          {/* OPERATION: CLOSE */}
          <Close />
          {/* LOGOUT TIMER */}
          <div>
            {/* Your other components */}
            <LogoutTimer onTimeout={handleTimeout} />
          </div>
        </main>
      )}
    </>
  );
}

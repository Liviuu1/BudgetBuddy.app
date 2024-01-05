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
          <LogoutTimer />
        </main>
      )}
    </>
  );
}

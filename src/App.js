import "./style.css";
import Header from "./components/Header";
import Balance from "./components/Balance";
import Movements from "./components/Movements";
import Summary from "./components/Summary";
import Transfers from "./components/Transfers";
import Loan from "./components/Loan";
import Close from "./components/Close";
import LogoutTimer from "./components/LogoutTimer";
import { getAuth, signOut } from "firebase/auth";

import DepositWithdraw from "./components/DepositWithdraw";
import { useAuth } from "./AuthContext";
import HeroSection from "./components/HeroSection";
export default function App() {
  const { user } = useAuth();

  const handleTimeout = async () => {
    // Log out the user when the timer reaches 0
    const auth = getAuth(); // Get the auth instance
    try {
      await signOut(auth); // Sign out the user
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle error as needed
    }
  };

  return (
    <>
      <Header />
      {!user ? (
        <HeroSection />
      ) : (
        <main className="app">
          {/* BALANCE */}
          <Balance />
          {/* MOVEMENTS */}
          <Movements />
          {/* SUMMARY */}
          <Summary />
          {/* OPERATION: DEPOSIT/WITHDRAW */}
          <DepositWithdraw />
          {/* OPERATION: TRANSFERS */}
          <Transfers />
          {/* OPERATION: LOAN */}
          <Loan />
          {/* OPERATION: CLOSE */}
          <Close />
          {/* LOGOUT TIMER */}
          {/* Your other components */}
          <LogoutTimer onTimeout={handleTimeout} />
        </main>
      )}
    </>
  );
}

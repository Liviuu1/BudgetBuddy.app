import "./style.css";
import Header from "./components/Header";
import Balance from "./components/Balance";
import Movements from "./components/Movements";
import Summary from "./components/Summary";
import Transfers from "./components/Transfers";
import Loan from "./components/Loan";
import Close from "./components/Close";
import LogoutTimer from "./components/LogoutTimer";

export default function App() {
  return (
    <>
      <Header />
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
    </>
  );
}

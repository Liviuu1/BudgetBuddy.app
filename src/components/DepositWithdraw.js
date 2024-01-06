import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Timestamp } from "firebase/firestore";
function DepositWithdraw() {
  const [amount, setAmount] = useState("");
  const [isDeposit, setIsDeposit] = useState(true);
  const { account } = useAuth();

  if (account) {
    const newTimestamp = Timestamp.fromDate(new Date());
    const newMovementKey = `movement${
      Object.keys(account.movements).length + 1
    }`;
    const handleOperation = (e) => {
      e.preventDefault();
      // Implement your logic for deposit or withdrawal here

      if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      if (isDeposit) {
        account.movements[newMovementKey] = [newTimestamp, amount];
        console.log("Deposit amount:", amount);
      } else {
        account.movements[newMovementKey] = [newTimestamp, -amount];
        // Handle withdrawal
        console.log("Withdrawal amount:", amount);
      }

      // Clear the input field after the operation
      setAmount("");
    };
  }

  return (
    <div className="operation operation--deposit-withdraw">
      <h2>{isDeposit ? "Deposit money" : "Withdraw money"}</h2>
      <form className="form form--loan">
        <input type="number" className="form__input form__input--loan-amount" />
        <button className="form__btn form__btn--loan">→</button>
        <div className="checkbox__div">
          <span>Deposit/Withdraw</span>
          <input
            type="checkbox"
            checked={isDeposit}
            onChange={() => setIsDeposit(!isDeposit)}
            className="checkbox__input"
          />
        </div>
        <label className="form__label form__label--loan">Amount</label>
      </form>
    </div>
  );
}

export default DepositWithdraw;

import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Timestamp, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
function DepositWithdraw() {
  const [amount, setAmount] = useState("");
  const [isDeposit, setIsDeposit] = useState(true);
  const { account } = useAuth();
  if (account) {
    const handleOperation = async (e) => {
      e.preventDefault();
      const newTimestamp = Timestamp.fromDate(new Date());
      const newMovementKey = `movement${
        Object.keys(account.movements).length + 1
      }`;

      // Implement your logic for deposit or withdrawal here
      console.log(amount);

      if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      const updatedMovements = { ...account.movements }; // Create a copy of movements

      // Calculate current balance by summing up the amounts in movements
      const currentBalance = Object.values(updatedMovements).reduce(
        (total, [, movementAmount]) => total + parseFloat(movementAmount),
        0
      );

      // Check if it's a withdrawal and if the amount is greater than the current balance
      if (!isDeposit && parseFloat(amount) > currentBalance) {
        alert("Insufficient funds. Withdrawal amount exceeds account balance.");
        return;
      }

      if (isDeposit) {
        updatedMovements[newMovementKey] = [newTimestamp, parseFloat(amount)];
        console.log(updatedMovements);
        console.log("Deposit amount:", amount);
      } else {
        updatedMovements[newMovementKey] = [newTimestamp, -parseFloat(amount)];
        // Handle withdrawal
        console.log("Withdrawal amount:", amount);
      }

      try {
        // Update the movements in Firebase
        await updateDoc(doc(collection(db, "accountsCollection"), account.id), {
          movements: updatedMovements,
        });
        console.log("Movements updated in Firebase.");
      } catch (error) {
        console.error("Error updating movements in Firebase:", error);
        alert("Error updating movements. Please try again later.");
      }

      // Clear the input field after the operation
      setAmount("");
    };

    return (
      <div className="operation operation--deposit-withdraw">
        <h2>{isDeposit ? "Deposit money" : "Withdraw money"}</h2>
        <form className="form form--loan">
          <input
            type="number"
            className="form__input form__input--loan-amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            onClick={handleOperation}
            className="form__btn form__btn--loan"
          >
            →
          </button>
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
}

export default DepositWithdraw;

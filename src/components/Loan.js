import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { updateDoc, doc, collection, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";

function Loan() {
  const [loanAmount, setLoanAmount] = useState("");
  const { account } = useAuth();
  const handleLoanRequest = async (e) => {
    e.preventDefault();

    e.preventDefault();
    const newTimestamp = Timestamp.fromDate(new Date());
    const newMovementKey = `movement${
      Object.keys(account.movements).length + 1
    }`;

    const amount = Math.floor(parseFloat(loanAmount));
    const movementsArray = Object.entries(account.movements);

    if (
      amount > 0 &&
      movementsArray.some(([_, movement]) => movement[1] >= amount * 0.1)
    ) {
      try {
        // Simulate a delay (similar to your setTimeout in the vanilla JS version)
        // You might want to handle this differently in a real-world application
        await new Promise((resolve) => setTimeout(resolve, 2500));

        // Update account movements
        const updatedMovements = { ...account.movements }; // Create a copy of movements
        updatedMovements[newMovementKey] = [newTimestamp, parseFloat(amount)];

        const accountDocRef = doc(
          collection(db, "accountsCollection"),
          account.id
        );

        await updateDoc(accountDocRef, { movements: updatedMovements });

        // Clear the loan amount input field
        setLoanAmount("");
        console.log(`Loan Succesful!`);
      } catch (error) {
        console.error("Error processing loan request:", error);
      }
    } else {
      alert("The amount requested does not meet the requirements for a loan");
    }
  };

  return (
    <div className="operation operation--loan">
      <h2>Request loan</h2>
      <form className="form form--loan">
        <input
          type="number"
          className="form__input form__input--loan-amount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <button
          onClick={handleLoanRequest}
          className="form__btn form__btn--loan"
        >
          →
        </button>
        <label className="form__label form__label--loan">Amount</label>
      </form>
    </div>
  );
}

export default Loan;

import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

function Transfers() {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const { account } = useAuth();

  const handleTransfer = async (e) => {
    e.preventDefault();
    const updatedMovements = { ...account.movements }; // Create a copy of movements

    // Calculate current balance by summing up the amounts in movements
    const currentBalance = Object.values(updatedMovements).reduce(
      (total, [, movementAmount]) => total + parseFloat(movementAmount),
      0
    );
    const cleanedRecipientEmail = recipientEmail.trim();
    // Check if recipient email is provided
    if (!cleanedRecipientEmail) {
      alert("Please enter recipient email.");
      return;
    }

    // Check if transfer amount is provided and valid
    if (isNaN(transferAmount) || transferAmount <= 0) {
      alert("Please enter a valid transfer amount.");
      return;
    }

    // Check if the user has sufficient funds for the transfer
    if (currentBalance < transferAmount) {
      alert("Insufficient funds for the transfer.");
      return;
    }

    try {
      // Fetch recipient account data
      const recipientAccountRef = collection(db, "accountsCollection");
      const recipientQuery = query(
        recipientAccountRef,
        where("owner", "==", cleanedRecipientEmail)
      );
      const recipientSnapshot = await getDocs(recipientQuery);

      if (recipientSnapshot.size > 0) {
        // The recipient exists, you can proceed with the transfer
        const recipientAccountDoc = recipientSnapshot.docs[0];
        const recipientMovements = { ...recipientAccountDoc.data().movements };

        const newTimestamp = Timestamp.fromDate(new Date());
        const newMovementKey = `movement${
          Object.keys(recipientMovements).length + 1
        }`;

        // Update recipient's movements
        recipientMovements[newMovementKey] = [
          newTimestamp,
          parseFloat(transferAmount),
        ];

        // Update recipient's account in Firebase
        await updateDoc(recipientAccountDoc.ref, {
          movements: recipientMovements,
        });

        // Deduct transfer amount from the sender's account
        const senderMovements = { ...account.movements };
        const senderNewMovementKey = `movement${
          Object.keys(senderMovements).length + 1
        }`;
        senderMovements[senderNewMovementKey] = [
          newTimestamp,
          -parseFloat(transferAmount),
        ];

        // Update sender's account in Firebase
        await updateDoc(doc(collection(db, "accountsCollection"), account.id), {
          movements: senderMovements,
        });

        alert("Transfer successful!");
        setRecipientEmail("");
        setTransferAmount("");
      } else {
        // The recipient does not exist
        alert("Recipient not found.");
        // You can show an alert or handle it accordingly
      }
    } catch (error) {
      console.error("Error during transfer:", error);
      alert("Error during transfer. Please try again later.");
    }
  };

  return (
    <div className="operation operation--transfer">
      <h2>Transfer money</h2>
      <form className="form form--transfer">
        <input
          type="text"
          className="form__input form__input--to"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
        />
        <input
          type="number"
          className="form__input form__input--amount"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
        />
        <button
          onClick={handleTransfer}
          className="form__btn form__btn--transfer"
        >
          →
        </button>
        <label className="form__label">Transfer to</label>
        <label className="form__label">Amount</label>
      </form>
    </div>
  );
}

export default Transfers;

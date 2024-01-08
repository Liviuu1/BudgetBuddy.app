import React from "react";
import { useAuth } from "../AuthContext";

function Balance() {
  const { account } = useAuth();

  if (account) {
    const updatedMovements = { ...account.movements }; // Create a copy of movements

    // Calculate current balance by summing up the amounts in movements
    const currentBalance = Object.values(updatedMovements).reduce(
      (total, [, movementAmount]) => total + parseFloat(movementAmount),
      0
    );
    return (
      <div className="balance">
        <div>
          <p className="balance__label">Current balance</p>
          <p className="balance__date">
            As of <span className="date">{new Date().toLocaleString()}</span>
          </p>
        </div>
        <p className="balance__value">{`${currentBalance} €`}</p>
      </div>
    );
  }
}

export default Balance;

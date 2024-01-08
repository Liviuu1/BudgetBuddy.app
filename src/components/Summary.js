import React from "react";
import { useAuth } from "../AuthContext";

function Summary() {
  const { account } = useAuth();
  if (account) {
    let totalIn = Object.values(account.movements)
      .filter(([, amount]) => amount > 0)
      .reduce((total, [, amount]) => total + parseFloat(amount), 0);
    let totalOut = Object.values(account.movements)
      .filter(([, amount]) => amount < 0)
      .reduce((total, [, amount]) => total + parseFloat(amount), 0);

    return (
      <div className="summary">
        <p className="summary__label">In</p>
        <p className="summary__value summary__value--in">{totalIn}€</p>
        <p className="summary__label">Out</p>
        <p className="summary__value summary__value--out">{totalOut}€</p>
        {/* <button className="btn--sort" onClick={sortedMovements}>
        ↓ SORT
      </button> */}
      </div>
    );
  }
}

export default Summary;

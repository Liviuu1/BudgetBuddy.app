import React, { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "../AuthContext";

function Movements() {
  const { account, loading, error } = useAuth();
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    if (account) {
      console.log(account.movements);
      setMovements(Object.entries(account?.movements));
    }
  }, [account]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (account) {
    return (
      <div className="movements">
        {movements.map(([_, movementArray], i) => (
          <div className="movements__row" key={i}>
            <div
              className={`movements__type movements__type--${
                movementArray[1] >= 0 ? "deposit" : "withdrawal"
              }`}
            >
              {`${i + 1} ${movementArray[1] >= 0 ? "deposit" : "withdrawal"}`}
            </div>
            <div className="movements__date">
              {movementArray[0] instanceof Timestamp
                ? new Date(movementArray[0].seconds * 1000).toLocaleString()
                : String(movementArray[0])}
            </div>
            <div className="movements__value">{movementArray[1]}€</div>
          </div>
        ))}
      </div>
    );
  }

  return <p>No movements found.</p>;
}

export default Movements;

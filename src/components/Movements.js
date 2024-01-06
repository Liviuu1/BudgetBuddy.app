import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDoc, doc, collection } from "firebase/firestore"; // Import collection function
import { Timestamp } from "firebase/firestore";
import { useAuth } from "../AuthContext";

function Movements() {
  const { user } = useAuth();
  const [account, setAcc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Import collection function from the correct module
  const accountDocRef = doc(collection(db, "accountsCollection"), user?.uid);

  useEffect(() => {
    const getMovementsList = async () => {
      try {
        const docSnap = await getDoc(accountDocRef);

        if (docSnap.exists()) {
          const accountData = { ...docSnap.data(), id: docSnap.id };
          setAcc(accountData);
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching movements. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getMovementsList();
  }, [accountDocRef]); // Ensure accountDocRef is included in the dependency array

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (account) {
    return (
      <div className="movements">
        {Object.entries(account?.movements).map(
          ([movementKey, movementArray], i) => (
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
              <div className="movements__value">
                {movementArray[1]} {movementArray[1] > 0 ? "" : "€"}
              </div>
            </div>
          )
        )}
      </div>
    );
  }

  return <p>No movements found.</p>;
}

export default Movements;

import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

function Movements() {
  const accountId = "account1Document";
  const [account, setAcc] = useState(null);
  const accountsCollectionRef = collection(db, "accountsCollection");
  const accountDocRef = doc(accountsCollectionRef, accountId);

  useEffect(() => {
    const getMovementsList = async () => {
      // READ THE DATA FROM DB
      // SET THE ACC LIST
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
      }
    };

    getMovementsList();
  }, []);

  if (account) {
    // console.log(account);
    // console.log(account?.movements);
    return (
      <div className="movements">
        {
          // Using Object.entries to map over movements
          Object.entries(account?.movements).map(
            ([movementKey, movementArray], i) => (
              <div className="movements__row" key={i}>
                <div
                  className={`movements__type movements__type--${
                    movementArray[1] > 0 ? "deposit" : "withdrawal"
                  }`}
                >
                  {`${i + 1} ${
                    movementArray[1] > 0 ? "deposit" : "withdrawal"
                  }`}
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
          )
        }
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default Movements;

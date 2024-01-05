import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

function Movements() {
  const [accList, setAccList] = useState([]);
  const accountsCollectionRef = collection(db, "accountsCollection");
  useEffect(() => {
    const getMovementsList = async () => {
      // READ THE DATA FROM DB
      // SET THE ACC LIST
      try {
        const data = await getDocs(accountsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setAccList(filteredData);
        console.log(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getMovementsList();
  }, []);

  return (
    <div className="movements">
      <div className="movements__row">
        <div className="movements__type movements__type--deposit">
          2 deposit
        </div>
        <div className="movements__date">3 days ago</div>
        {/* {accList.map((acc) => (
          <div className="movements__value">{acc.movements}</div>
        ))} */}
      </div>
      <div className="movements__row">
        <div className="movements__type movements__type--withdrawal">
          1 withdrawal
        </div>
        <div className="movements__date">24/01/2037</div>
        <div className="movements__value">-378€</div>
      </div>
    </div>
  );
}

export default Movements;

import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

function Close() {
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useAuth();

  const handleCloseAccount = async (e) => {
    e.preventDefault();

    try {
      // Verify user credentials
      const credentialsCorrect = confirmEmail === user.email && confirmPassword; // You may want to implement proper password verification

      if (!credentialsCorrect) {
        alert("Incorrect email or password.");
        return;
      }

      // Reauthenticate user
      const credential = EmailAuthProvider.credential(
        user.email,
        confirmPassword
      );

      await reauthenticateWithCredential(user, credential);

      // Now the user is successfully reauthenticated, proceed with account closure logic

      // Delete account from Firestore
      await deleteDoc(doc(db, "accountsCollection", user.uid));

      // Delete user account from Firebase Authentication
      await deleteUser(auth.currentUser);

      console.log("Account successfully closed.");
    } catch (error) {
      console.error("Error closing account:", error);
      alert("Error closing account. Please try again later.");
    }
  };
  return (
    <div className="operation operation--close">
      <h2>Close account</h2>
      <form className="form form--close">
        <input
          type="text"
          className="form__input form__input--user "
          onChange={(e) => setConfirmEmail(e.target.value)}
          value={confirmEmail}
        />
        <input
          type="password"
          className="form__input form__input--pin"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          onClick={handleCloseAccount}
          className="form__btn form__btn--close"
        >
          →
        </button>
        <label className="form__label">Confirm Email</label>
        <label className="form__label password_label">Confirm Password</label>
      </form>
    </div>
  );
}
export default Close;

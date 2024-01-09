import React, { useRef, useState } from "react";
import { auth, db, googleProvider, storage } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  GoogleLogo,
  SignOut,
  SignIn,
  UserPlus,
  UserCircle,
} from "@phosphor-icons/react";
import { Timestamp, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Header() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const { user } = useAuth();
  const accountsCollectionRef = collection(db, "accountsCollection");
  const fileInputRef = useRef(null);

  // console.log(auth?.currentUser?.email);

  console.log(user?.email);

  const handleIconClick = () => {
    // Trigger the click event on the file input
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    // Handle the file change as needed
    setProfilePicture(e.target.files[0]);
  };
  const signUp = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Access the newly created user
      const user = userCredential.user;

      // Check if the user already exists in the database
      const userDocRef = doc(accountsCollectionRef, user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Determine the user's currency based on the browser's language
        const browserCurrency = new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "EUR", // Default to EUR if unable to determine
        }).resolvedOptions().currency;

        // Determine the user's locale based on the browser's language
        const browserLocale = navigator.language;

        // If the user does not exist, add them to the database
        const newAccount = {
          owner: user.email,
          currency: browserCurrency,
          locale: browserLocale || "en-US", // Default to en-US if unable to determine
          movements: {
            movement1: [Timestamp.fromDate(new Date()), 0],
          },
          interestRate: 1.2,
          // Add other properties as needed (e.g., interestRate)
        };

        // Add the new account to the "accountsCollection" in Firestore
        await setDoc(userDocRef, newAccount);
      }

      // Log the user in
      // You may want to redirect the user or perform additional actions after sign up
      console.log("User signed up:", user.email);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithEmail = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if the user already exists in the database
      const userDocRef = doc(accountsCollectionRef, user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Determine the user's currency based on the browser's language
        const browserCurrency = new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "EUR", // Default to EUR if unable to determine
        }).resolvedOptions().currency;

        // Determine the user's locale based on the browser's language
        const browserLocale = navigator.language;

        // If the user does not exist, add them to the database
        const newAccount = {
          owner: user.email,
          currency: browserCurrency,
          locale: browserLocale || "en-US", // Default to en-US if unable to determine
          movements: {
            movement1: [Timestamp.fromDate(new Date()), 0],
          },
          interestRate: 1.2,
          // Add other properties as needed (e.g., interestRate)
        };

        // Add the new account to the "accountsCollection" in Firestore
        await setDoc(userDocRef, newAccount);
      }

      // Log the user in
      // You may want to redirect the user or perform additional actions after sign in
      console.log("User signed in with Google:", user.email);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProfilePictureUpload = async () => {
    if (!user) {
      console.log("Please log in to upload a profile picture.");
      return;
    }

    if (profilePicture) {
      console.log("Profile picture area clicked!");
      try {
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, profilePicture);

        const downloadURL = await getDownloadURL(storageRef);

        // Update the user's photoURL in Firebase Authentication
        await updateProfile(auth.currentUser, { photoURL: downloadURL });

        // Set the profile picture URL in local state to re-render the component
        setProfilePicture(null);

        console.log("Profile picture uploaded successfully.");
      } catch (error) {
        console.error("Error uploading profile picture:", error.message);
      }
    }
  };

  const handleLogoClick = () => {
    // Reload the entire page
    window.location.reload();
  };
  return (
    <nav className="header-nav__">
      {user ? (
        <div className="profile-picture" onClick={handleProfilePictureUpload}>
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="profile-picture__img"
            />
          ) : (
            <div className="upload_profile_picture_div">
              <input
                type="file"
                id="fileInput"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }} // Hide the file input
              />
              <UserCircle
                size={32}
                onClick={handleIconClick}
                style={{ cursor: "pointer" }}
                title="Select Profile Picture"
              />
              <button
                className="login__btn upload_profile_picture"
                onClick={handleProfilePictureUpload}
                title="Upload Profile Picture"
              >
                Upload Profile Picture
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="welcome">Log in to get started</p>
      )}
      <img
        src="/images/logo.png"
        alt="Logo"
        className="logo"
        onClick={handleLogoClick}
      />
      <form className="login">
        {!user && (
          <>
            <input
              type="email"
              placeholder="Email"
              className="login__input login__input--user"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="login__input login__input--pin"
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}
        {!user ? (
          <button
            type="submit"
            onClick={signInWithEmail}
            className="login__btn"
            title="Log In With Email and Password"
          >
            <SignIn size={32} />
          </button>
        ) : null}
        {!user ? (
          <button
            type="button"
            className="login__btn"
            onClick={signUp}
            title="Sign Up"
          >
            <UserPlus size={32} />
          </button>
        ) : null}
        {!user ? (
          <button
            className="login__btn"
            type="button"
            onClick={signInWithGoogle}
            title="Sign In With Google"
          >
            <GoogleLogo size={32} />
          </button>
        ) : null}
        {user ? (
          <button className="login__btn" onClick={logout} title="Log Out">
            <SignOut size={32} />
          </button>
        ) : null}
      </form>
    </nav>
  );
}

export default Header;

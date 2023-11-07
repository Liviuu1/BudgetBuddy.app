import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { SignInMethod } from 'firebase/auth';
import Balance from './Balance';

firebase.initializeApp({
    apiKey: "AIzaSyCQT4r0CWb5_tRBnb6lHgZqJRVzEI4yhI0",
  authDomain: "budgetbuddy-2d56e.firebaseapp.com",
  projectId: "budgetbuddy-2d56e",
  storageBucket: "budgetbuddy-2d56e.appspot.com",
  messagingSenderId: "1001389927434",
  appId: "1:1001389927434:web:08b82b0e45b2eacdb703f3",
  measurementId: "G-R3BWDNF1MB"
})

const auth=firebase.auth();
const firestore = firebase.firestore();

const [user]=useAuthState(auth);

return(
    <div className="BudgetBuddy">
        <header>

            </header>

            <section>
                {user ? <Balance/> : <SignIn/>}
            </section>
            </div>

);

function SignIn(){
    const signInWtihGoogle=()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
    }

    return(
    <button onClick={signInWtihGoogle}>Sign in with Google</button>
    )
}
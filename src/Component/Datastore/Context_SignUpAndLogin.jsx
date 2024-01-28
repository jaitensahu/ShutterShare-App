import { useRef, useState } from "react";
import { createContext } from "react";
import React from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import {
  doc,
  getFirestore,
  setDoc,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
// import { GoogleAuthProvider } from "firebase/auth";

export const Store = createContext({});

// function reducer(state, action) {}

const ContextStore = ({ children }) => {
  const provider = new GoogleAuthProvider();
  let signUpEmail = useRef();
  let signUpName = useRef();
  let signUpUserName = useRef();
  let signUpPass = useRef();
  const auth = getAuth();
  let loginEmail = useRef();
  let loginPass = useRef();
  let [currentUser, setUserObj] = useState({});
  let [userDataFromDatabase, setUserData] = useState();

  /*--------------------- Get User Data Function----------------------------------*/
  function handleInputRef(email, name, userName, password) {
    if (email == "" || name == "" || userName == "" || password == "") {
      return false;
    }
    //  Creating New User Account
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Set Data to DataBase in users array
        setUserDataToDataBase(email, name, userName);
        updateProfile(auth.currentUser, {
          displayName: name,
          userName,
        })
          .then(() => {
            console.log("Profile updated!");
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });

        //  Setting Input fields to empty
        signUpEmail.current.value = "";
        signUpName.current.value = "";
        signUpUserName.current.value = "";
        signUpPass.current.value = "";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return false;
      });

    return true;
  }
  /*---------------------------------------------------------------------------- */
  /*----------------------------Update Profile Data Function -------------------- */
  function updateUserProfile() {
    updateProfile(auth.currentUser, {
      displayName: "Jane Q. User",
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  }
  /*-------------------------------------------------------------------------- */

  /*---------------------------GetData from DataBase according to email------- */
  async function getData(email) {
    // --------------------------------
    const docRef = doc(db, "users", email);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUserData(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  /*-------------------------------------------------------------------------- */
  /* ---------------------- Function to add data to Firestore Database -------*/
  async function setUserDataToDataBase(email, name, userName, profileUrl = "") {
    const docData = {
      name,
      email,
      userName,
      dateExample: Timestamp.fromDate(new Date()),
      profileUrl,
    };
    try {
      await setDoc(doc(db, `users/${email}`), docData);
    } catch (error) {
      console.log(error);
    }
  }
  /*--------------------------------------------------------------------------- */
  /*-----------------------   Log in with Google ----------------------------*/
  function signinWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUserDataToDataBase(
          user.email,
          user.displayName,
          user.displayName.split(" ")[0],
          user.photoURL
        );
        getData(user.email);
        setUserObj(user);
        // Need to add a condition if the User data is already present in the Database then user should Login and Navigate to the Dashboard
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(email, errorMessage);
      });
  }
  /*-------------------------------------------------------------------------- */
  /*----------------------------   LoginForm   -------------------------------*/
  function loginForm(email, password) {
    getData(email);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUserObj(response.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  /*------------------------------------------------------------------------- */

  /*-----------------     Logout Function      ------------------------------ */
  function logout() {
    signOut(auth)
      .then(() => {
        console.log("sign out");
        setUserObj({});
      })
      .catch((err) => {
        console.log(err);
      });
  }
  /*------------------------------------------------------------------------- */

  return (
    <Store.Provider
      value={{
        handleInputRef,
        signUpEmail,
        signUpName,
        signUpUserName,
        signUpPass,
        signinWithGoogle,
        loginForm,
        loginPass,
        loginEmail,
        currentUser,
        setUserObj,
        logout,
        getData,
        userDataFromDatabase,
      }}
    >
      {children}
    </Store.Provider>
  );
};

export default ContextStore;

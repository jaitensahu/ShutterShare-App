import { useContext, useReducer, useRef, useState } from "react";
import { createContext } from "react";
import React from "react";
import { database } from "../firebase";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
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
  let [userObj, setUserObj]=useState({});
  console.log(userObj);

  
  // Get User Data Function
  function handleInputRef(email, name, userName, password) {
    console.log(email, name, userName, password);
    if(email=="" || name=="" || userName=="" || password=="" ){
      return false;
    }
    //  Creating New User Account
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Set Data to DataBase in users array
       setUserDataToDataBase(email, name, userName, password)
        // console.log(user);
        //  Setting Input fields to empty
        signUpEmail.current.value = "";
        signUpName.current.value = "";
        signUpUserName.current.value = "";
        signUpPass.current.value = "";
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        return false;
      });

      return true;
  }

  // Function to add data to database
  function setUserDataToDataBase(email, name, userName, password){
    const db = getDatabase();
    set(ref(db, "users/" + userName), {
      name: name,
      email: email,
      userName: userName,
      password: password,
    });

  }

  // Log in with Google
  function signinWithGoogle(){
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    
    // Need to add a condition if the User data is already present in the Database then user should Login and Navigate to the Dashboard
  }).catch((error) => {
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

  function loginForm(email, password){
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
    .then((response)=>{
      console.log(response);
      setUserObj(response.user)
    }).catch((err)=>{
      console.log(err);
    })
  }
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
        userObj,
        setUserObj
      }}
    >
      {children}
    </Store.Provider>
  );
};

export default ContextStore;

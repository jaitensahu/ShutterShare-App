import { useRef, useState } from "react";
import { createContext } from "react";
import React from "react";
import { toast } from "react-toastify";
import {
  doc,
  setDoc,
  Timestamp,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
// import { db } from "../firebase";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { MutatingDots } from "react-loader-spinner";
import { db } from "../firebase";
// import { doc, onSnapshot } from "firebase/firestore";
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
  let [showErrorMessage, setErrorMessage] = useState("");

  // let [signUpUserName, setSignUpUserName] = useState("");
  let [currentUser, setUserObj] = useState({});
  let [userDataFromDatabase, setUserData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  // const [isEmailPresent, setPresentAbsent] = useState(false);
  let [isValid, setValid] = useState(true);
  let [isLoading, setIsLoading] = useState(false);
  let isEmailPresent = false;
  /*--------------------- Get User Data Function----------------------------------*/
  async function handleInputRef(email, name, userName, password) {
    if (email == "" || name == "" || userName == "" || password == "") {
      setErrorMessageFunc("Please fill all the inputs");
      return true;
    }
    function validateUserDetail(password) {
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);

      if (hasNumber && hasSpecialChar && hasLowercase && hasUppercase) {
        return true;
      } else if (password.length < 8) {
        setErrorMessageFunc("Password too short...");
      } else if (!hasNumber) {
        setErrorMessageFunc("Password should have atleast one number");
      } else if (!hasSpecialChar) {
        setErrorMessageFunc(
          "Password should have atleast one Special Character"
        );
      } else if (!hasLowercase) {
        setErrorMessageFunc(
          "Password should contain atleast one lowercase letter."
        );
      } else if (!hasUppercase) {
        setErrorMessageFunc(
          "Password should contain atleast one uppercase letter."
        );
      }
      return false;
    }
    if (!validateUserDetail(password)) {
      return true;
    }

    //  Creating New User Account
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Set Data to DataBase in users array
        setUserDataToDataBase(email, name, userName);
        //  Setting Input fields to empty
        signUpEmail.current.value = "";
        signUpName.current.value = "";
        signUpUserName.current.value = "";
        signUpPass.current.value = "";
        // sendEmailVerificationLink();
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessageFunc(errorMessage);
        return true;
      });

    return false;
  }

  function updateUser() {
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
  }
  /*---------------------------------------------------------------------------- */

  /*------------------------Function to check userName----------------------------- */
  async function checkUserName(selectedEmail, selectedUsername) {
    let allUserName = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      allUserName.push(doc.data());
    });
    // Email already exits. Please use different email
    if (allUserName.some((ele) => ele.email == selectedEmail)) {
      setErrorMessageFunc("Email Already Exist");
    } else if (allUserName.some((ele) => ele.userName == selectedUsername)) {
      setErrorMessageFunc("Username Already Exist..!!");
    } else {
      setErrorMessage("");
    }
  }
  /*-------------------------------------------------------------------------------- */
  /*------------------------------Debouncing for userName and Email---------------------------------------*/
  function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  function setUserName(selectedEmail, selectedUsername) {
    checkUserName(selectedEmail, selectedUsername);
  }
  const debouncedHandleInput = debounce(setUserName, 500);

  /*----------------------------Update Profile Data Function -------------------- */
  function updateUserProfile() {
    updateProfile(auth.currentUser, {
      // displayName: "Jane Q. User",
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
      .then(() => {
        // Profile updated!
        // ...
        console.log("profile Updated");
      })
      .catch((error) => {
        // An error occurred
        // ...
        console.log(error);
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
        setUserData(docSnap.data());
        console.log(docSnap.data());
        return docSnap.data();
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.log("got error", error);
    }
  }

  /*-------------------------------------------------------------------------- */

  // ------------------------Update Data in DataBase--------------------------
  const UpdateDataInDataBase = async (email, updates) => {
    try {
      const UpdatedData = doc(db, "users", email);
      console.log(UpdatedData);
      let abc = await updateDoc(UpdatedData, { userProfileInfo: updates });
    } catch (error) {
      console.log("error", error);
    }
  };

  /* ---------------------- Function to add data to Firestore Database -------*/
  async function setUserDataToDataBase(email, name, userName, profileUrl = "") {
    const docData = {
      name,
      email,
      userName,
      userCreated: new Date().getTime(),
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
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        let d = await getData(user.email);
        if (d == null) {
          setUserDataToDataBase(
            user.email,
            user.displayName,
            user.email.split("@")[0],
            user.photoURL
          );
        }

        setUserObj(user);
        // Need to add a condition if the User data is already present in the Database then user should Login and Navigate to the Dashboard
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", errorMessage);
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
  /*-------------------------------------------------------------------------- */
  /*----------------------------   LoginForm   -------------------------------*/
  function loginForm(email, password) {
    console.log("in login function");
    setIsLoading(true);
    getData(email);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setIsLoading(false);
        setUserObj(response.user);
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMessageFunc(err.message.split(":")[1]);
        setIsLoading(false);
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

  // ----------------Set Error Message --------------------------------------
  function setErrorMessageFunc(error) {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }
  // -----------------------------------------------------------------------------
  /*-----------------------Send Email Verification Link ------------------------- */
  function sendEmailVerificationLink() {
    const auth = getAuth();
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
      console.log("Email verification sent");
    });
  }
  /*------------------------Send password change link to user's email--------------------- */
  function sendPassVerificationLink(mail) {
    const auth = getAuth();
    console.log("sending link", loginEmail, mail, auth);

    sendPasswordResetEmail(auth, mail)
      .then(() => {
        // Password reset email sent!
        // ..
        console.log("Password reset email sent!");
        setErrorMessageFunc("Password reset email sent!");
        // notify("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  /*----------------------------------------------------------------------------------- */

  const notify = (message) => {
    toast(message, {
      position: "bottom-center",
    });
  };

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
        isOpen,
        setIsOpen,
        updateUserProfile,
        setUserDataToDataBase,
        UpdateDataInDataBase,
        setValid,
        isValid,
        setUserName,
        debouncedHandleInput,
        showErrorMessage,
        setErrorMessage,
        isLoading,
        sendPassVerificationLink,
        setIsLoading,
        notify,
      }}
    >
      <div>
        {isLoading ? (
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{
              position: "fixed",
              top: "50%",
              left: "50%",
              zIndex: "10000",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 1000px 500px #00000087",
              backgroundColor: "#00000087",
              border: "none",
            }}
            // wrapperClass="loder"
            // className={style.loder}
          />
        ) : null}
      </div>
      {children}
    </Store.Provider>
  );
};

export default ContextStore;

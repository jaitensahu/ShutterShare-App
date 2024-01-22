// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDomTDCwJ9sQ7ECNE2jbX_cWcTSGa80w_4",
  authDomain: "instagram-clone810.firebaseapp.com",
  projectId: "instagram-clone810",
  storageBucket: "instagram-clone810.appspot.com",
  messagingSenderId: "253986941189",
  appId: "1:253986941189:web:08b1c90c798d13cf54ef6c",
  measurementId: "G-XPVHB5EFVW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
// export const analytics = getAnalytics(app);

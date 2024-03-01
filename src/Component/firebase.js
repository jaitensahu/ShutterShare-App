import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Get a non-default Storage bucket
// const firebaseApp = getApp();
// const storage = getStorage(
//   firebaseApp,
//   "https://console.firebase.google.com/u/0/project/instagram-clone810/storage/instagram-clone810.appspot.com/files"
// );
// console.log(storage);
console.log("in firebase");
const firebaseConfig = {
  apiKey: "AIzaSyDomTDCwJ9sQ7ECNE2jbX_cWcTSGa80w_4",
  authDomain: "instagram-clone810.firebaseapp.com",
  projectId: "instagram-clone810",
  storageBucket: "instagram-clone810.appspot.com",
  messagingSenderId: "253986941189",
  appId: "1:253986941189:web:08b1c90c798d13cf54ef6c",
  measurementId: "G-XPVHB5EFVW",
  databaseURL: "https://instagram-clone810-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const database = getDatabase(app);
export const db = getFirestore(app);

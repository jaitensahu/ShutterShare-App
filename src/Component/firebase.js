
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 

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


 

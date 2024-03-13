import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect, useContext, memo } from "react";
import { db } from "../firebase";
import { Store } from "../Datastore/Context_SignUpAndLogin";
import { useSelector } from "react-redux";

const useLikedPost = () => {
  const [allLikedPost, setAllLikedPost] = useState([]);

  useEffect(() => {
    console.log("useLikedPOst gets Called");
    const fetchData = async () => {
      try {
        const tempArr = [];
        const querySnapshot = await getDocs(collection(db, "allPosts"));
        querySnapshot.forEach((doc) => {
          tempArr.push(doc.data());
        });
        setAllLikedPost([...tempArr]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []); // Empty dependency array means this effect runs once after the initial render

  return [allLikedPost];
};

export default useLikedPost;

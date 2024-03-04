import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { Store } from "../Datastore/Context_SignUpAndLogin";
import { useSelector } from "react-redux";

const useDbData = () => {
  const [userData, setUserData] = useState([]);
  let { isAddingInFollower } = useSelector((state) => state.EditProfileSlice);
  console.log(isAddingInFollower);
  useEffect(() => {
    console.log("useEffect gets Called");
    const fetchData = async () => {
      try {
        const tempArr = [];
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          tempArr.push(doc.data());
        });
        setUserData([...tempArr]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, [isAddingInFollower]); // Empty dependency array means this effect runs once after the initial render

  return [userData];
};

export default useDbData;

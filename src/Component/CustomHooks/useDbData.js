import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import { db } from "../firebase";
import { Store } from "../Datastore/Context_SignUpAndLogin";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../Datastore/ReduxStore/AllSlices/DashboardSlice";

const useDbData = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.DashboardSlice);
  const { isAddingInFollower } = useSelector((state) => state.EditProfileSlice);
  const tempArrRef = useRef([]);

  useEffect(() => {
    console.log("useDbData gets Called");
    const fetchData = async () => {
      try {
        const tempArr = [];
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          tempArr.push(doc.data());
        });

        if (JSON.stringify(tempArr) !== JSON.stringify(tempArrRef.current)) {
          dispatch(setUserData([...tempArr]));
          tempArrRef.current = tempArr;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, [isAddingInFollower, dispatch]);

  return [userData];
};

export default useDbData;

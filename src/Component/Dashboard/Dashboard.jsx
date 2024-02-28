import React, { useContext, useEffect, useState } from "react";
import { Store } from "../Datastore/Context_SignUpAndLogin";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "./Dashboard.css";
import RightDashBoard from "./RightDashBoard";
import PostComponent from "../PostComponent/PostComponent";

const Dashboard = () => {
  let { currentUser } = useContext(Store);
  let auth = getAuth();
  let navigateTo = useNavigate();

  // --------Route Protection for UnAuthorized Access to DashBoard--------
  useEffect(() => {
    if (auth.currentUser == null) {
      navigateTo("/login");
    }
  }, [currentUser]);
  // ----------------------------------------------------------

  return (
    <div className="w-11/12 flex justify-end gap-40">
      <div className="Dashboard flex justify-between ">
        <div className="post flex flex-col gap-5">
          {/* <h1>DaSshBoard</h1> */}
          <PostComponent />
          <PostComponent />
          <PostComponent />
          <PostComponent />
          <PostComponent />
        </div>
      </div>
      <RightDashBoard />
    </div>
  );
};

export default Dashboard;

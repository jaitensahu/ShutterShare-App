import React, { useContext, useEffect, useState } from "react";
import { Store } from "../Datastore/Context_SignUpAndLogin";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "./Dashboard.css";
import RightDashBoard from "./RightDashBoard";
import PostComponent from "../PostComponent/PostComponent";
import InstaStories from "../InstaStories/InstaStories";

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
    <div className="w-[100%] flex gap-[50px] justify-around dashboardContainer pr-[5%]">
      <div className="Dashboard flex flex-col w-[60%]  ml-[3%]">
        <div>
          <InstaStories />
        </div>
        <div className="post flex flex-col gap-5 w-[80%] max-w-[500px] mx-auto">
          {/* <h1>DaSshBoard</h1> */}
          <PostComponent />
          <PostComponent />
          <PostComponent />
          <PostComponent />
          <PostComponent />
        </div>
      </div>
      <div className="rightContainer w-[30%] min-w-[200px] max-w-[250px]">
        <RightDashBoard />
      </div>
    </div>
  );
};

export default Dashboard;

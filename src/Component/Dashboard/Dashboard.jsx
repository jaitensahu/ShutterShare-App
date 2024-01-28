import React, { useContext, useEffect, useState } from "react";
import { Store } from "../Datastore/Context_SignUpAndLogin";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "./Dashboard.css";
import SearchComponent from "./DashBoard-SubComponents/SearchComponent";
import { Button, Drawer, Modal } from "@mui/material";

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
    <>
      <div className="Dashboard flex justify-between ">
        <div className="post">
          <h1>DaSshBoard</h1>
        </div>
      </div>

    </>
  );
};

export default Dashboard;

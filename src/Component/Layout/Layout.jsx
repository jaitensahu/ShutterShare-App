import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import LeftDashBoard from "../Dashboard/LeftDashBoard";
import RightDashBoard from "../Dashboard/RightDashBoard";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="Dashboard flex justify-between">
      <LeftDashBoard />
      <Outlet />
      <RightDashBoard />
      
    </div>
  );
};

export default Layout;

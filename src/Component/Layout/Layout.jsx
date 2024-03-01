import React from "react";
import LeftDashBoard from "../Dashboard/LeftDashBoard";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="">
      <LeftDashBoard />
      <div className="rightsideContainer ml-[7%] w-5/6  min-[1110px]:ml-[17%]  ">
        <Outlet />
      </div>{" "}
    </div>
  );
};

export default Layout;

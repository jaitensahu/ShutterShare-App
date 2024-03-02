import React, { useContext } from "react";
import LeftDashBoard from "../Dashboard/LeftDashBoard";
import { Outlet } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import { Store } from "../Datastore/Context_SignUpAndLogin";

const Layout = () => {
  let {isLoading } = useContext(Store)
  return (
    <>
      <div className="">
        <LeftDashBoard />
        <div className="rightsideContainer ml-[7%] w-5/6  min-[1110px]:ml-[17%]  ">
          <Outlet />
        </div>{" "}
      </div>
    </>
  );
};

export default Layout;

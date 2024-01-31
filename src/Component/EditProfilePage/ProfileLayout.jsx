import React from "react";
import EditProfilePage from "./EditProfilePage";
import TabsToSwitch from "./TabsToSwitch";
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="flex flex-col items-center">
      <EditProfilePage />
      <TabsToSwitch />
      <Outlet />
    </div>
  );
};

export default ProfileLayout;

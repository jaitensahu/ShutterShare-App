import React, { memo, useContext } from "react";
import { Store } from "../Datastore/Context_SignUpAndLogin";

const RightDashBoard = () => {
  let { currentUser, userDataFromDatabase } = useContext(Store);
 
  return (
    <div className="rightSideBar w-1/3 border border-black p-8 fixed right-0 h-screen">
      <div className="w-2/3 ">
        <div className="profile flex justify-between  items-center">
          <div className="profileImgAndName flex gap-2">
            <img
              src={userDataFromDatabase!=null?userDataFromDatabase.profileUrl:"" }
              className="w-11 rounded-full"
              alt=""
            />
            <div className="name_UserName">
              <p className="font-bold ">
                {userDataFromDatabase != null
                  ? userDataFromDatabase.userName
                  : ""}
              </p>
              <p className=" text-gray-500 text-xs font-semibold">
                {currentUser.displayName}
              </p>
            </div>
          </div>

          <h6 className="text-blue-500 font-bold text-xs">Switch</h6>
        </div>
        {/* <h1>Right sideBar</h1> */}
      </div>
    </div>
  );
};

export default memo(RightDashBoard);

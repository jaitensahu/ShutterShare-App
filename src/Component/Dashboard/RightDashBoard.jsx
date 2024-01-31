import React, { memo, useContext } from "react";
import { Store } from "../Datastore/Context_SignUpAndLogin";

const RightDashBoard = () => {
  let { currentUser, userDataFromDatabase } = useContext(Store);

  return (
    <>
      <div className="rightSideBar w-[20%] py-12  h-screen">
        <div className="w-full ">
          <div className="profile flex justify-between  items-center">
            <div className="profileImgAndName flex gap-2">
              <img
                src={
                  userDataFromDatabase != null
                    ? userDataFromDatabase.profileUrl
                    : ""
                }
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
        <h1 className="my-5">Suggested For You</h1>
        <div className="w-full my-4 ">
          <div className="profile flex justify-between  items-center">
            <div className="profileImgAndName flex gap-2">
              <img
                src={
                  userDataFromDatabase != null
                    ? userDataFromDatabase.profileUrl
                    : ""
                }
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

        <div className="w-full my-4 ">
          <div className="profile flex justify-between  items-center">
            <div className="profileImgAndName flex gap-2">
              <img
                src={
                  userDataFromDatabase != null
                    ? userDataFromDatabase.profileUrl
                    : ""
                }
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

        <div className="w-full my-4 ">
          <div className="profile flex justify-between  items-center">
            <div className="profileImgAndName flex gap-2">
              <img
                src={
                  userDataFromDatabase != null
                    ? userDataFromDatabase.profileUrl
                    : ""
                }
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
    </>
  );
};

export default memo(RightDashBoard);

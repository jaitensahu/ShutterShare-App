import React, { memo, useContext } from "react";
import { Store } from "../Datastore/Context_SignUpAndLogin";
import LetteredAvatar from "react-lettered-avatar";

const RightDashBoard = () => {
  let { currentUser, userDataFromDatabase } = useContext(Store);

  return (
    <>
      <div className="rightSideBar w-[100%] py-[30px]  h-screen">
        <div className="w-full ">
          <div className="profile flex justify-between gap-[10px] items-center">
            <div className="profileImgAndName flex items-center gap-2">
              {userDataFromDatabase.profileUrl != "" ? (
                <img
                  src={userDataFromDatabase.profileUrl}
                  className="w-11 rounded-full border-3"
                  alt=""
                />
              ) : (
                <LetteredAvatar
                  name={userDataFromDatabase.name}
                  size={35}
                  radius={50}
                  color="#fff"
                  // backgroundColor="rgb(55,55,22)"
                />
              )}
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
                  userDataFromDatabase.profileUrl != ""
                    ? userDataFromDatabase.profileUrl
                    : "https://www.freeiconspng.com/uploads/profile-icon-9.png"
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

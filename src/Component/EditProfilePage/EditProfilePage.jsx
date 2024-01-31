import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Store } from "../Datastore/Context_SignUpAndLogin";
import "reactjs-popup/dist/index.css";

const EditProfilePage = () => {
  // Getting userData From DataBase
  let { userDataFromDatabase } = useContext(Store);

  return (
    <>
      <div className="profilePage flex-grow ">
        <div className="profileDetail flex items-start gap-20 py-8">
          <div className="profileImage">
            <img
              src={userDataFromDatabase.profileUrl}
              alt=""
              className="w-40 rounded-full h-40"
            />
          </div>
          <div>
            <div className="profileTop flex items-center gap-6">
              <h1 className="text-xl">{userDataFromDatabase.userName}</h1>
              <NavLink
                to="/shutterShare/account/edit"
                className="py-2 px-4 text-sm rounded-lg bg-zinc-800"
              >
                Edit Profile
              </NavLink>
            </div>
            <div className="profilemid my-3 flex gap-10">
              <span>100 Posts </span> <span> 200 Follower </span>{" "}
              <span> 500 Following</span>
            </div>
            <div className="profileBottom">{userDataFromDatabase.name}</div>
            <div className="bio mt-3">Hii write Bio here</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfilePage;

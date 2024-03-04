import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Store } from "../Datastore/Context_SignUpAndLogin";
import { useSelector } from "react-redux";

const TabsToSwitch = () => {
  // Getting Data From DataBase of Currentuser
  let { otherUser } = useSelector((state) => state.EditProfileSlice);
  // console.log(otherUser);
  let { userDataFromDatabase } = useContext(Store);

  return (
    <div className="postDetails w-1/2 border-t-2  border-zinc-800">
      <div className="postReelsSaved flex justify-between w-full max-w-80 mx-auto">
        <NavLink
          to={`/shutterShare/${otherUser?.userName}`}
          className={({ isActive }) =>
            `${isActive ? "border-t-2" : "none"} py-4`
          }
        >
          POSTS
        </NavLink>

        <NavLink
          to={`/shutterShare/${otherUser?.userName}/reels`}
          className={({ isActive }) =>
            `${isActive ? "border-t-2" : "none"} py-4`
          }
        >
          REELS
        </NavLink>
        {otherUser?.userName == userDataFromDatabase?.userName ? (
          <NavLink
            to={`/shutterShare/${otherUser?.userName}/saved`}
            className={({ isActive }) =>
              `${isActive ? "border-t-2" : "none"} py-4`
            }
          >
            SAVED
          </NavLink>
        ) : null}
      </div>
    </div>
  );
};

export default TabsToSwitch;

import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { Store } from '../Datastore/Context_SignUpAndLogin';

const TabsToSwitch = () => {
  // Getting Data From DataBase of Currentuser
  let { userDataFromDatabase } = useContext(Store);

  return (
    <div className="postDetails w-1/2 border-t-2  border-zinc-800">
      <div className="postReelsSaved flex justify-between w-full max-w-80 mx-auto">
        <NavLink
          to={`/shutterShare/${userDataFromDatabase.userName}`}
          className={({ isActive }) =>
            `${isActive ? "border-t-2" : "none"} py-4`
          }
        >
          POSTS
        </NavLink>

        <NavLink
          to={`/shutterShare/${userDataFromDatabase.userName}/reels`}
          className={({ isActive }) =>
            `${isActive ? "border-t-2" : "none"} py-4`
          }
        >
          REELS
        </NavLink>
        <NavLink
          to={`/shutterShare/${userDataFromDatabase.userName}/saved`}
          className={({ isActive }) =>
            `${isActive ? "border-t-2" : "none"} py-4`
          }
        >
          SAVED
        </NavLink>
      </div>
    </div>
  );
}

export default TabsToSwitch

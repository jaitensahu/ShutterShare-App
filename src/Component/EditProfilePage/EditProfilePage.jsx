import React, { useContext, useEffect } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { Store } from "../Datastore/Context_SignUpAndLogin";
import "reactjs-popup/dist/index.css";
import useDbData from "../CustomHooks/useDbData";
import {
  setIsFollow,
  setOtherUser,
  setisAddingInFollower,
} from "../Datastore/ReduxStore/AllSlices/EditProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../firebase";
import LetteredAvatar from "react-lettered-avatar";

import { Backdrop, Skeleton } from "@mui/material";
import { UpdateDataInDataBase } from "../Datastore/ReduxStore/AllSlices/UploadToDB_ExtraSlice";
import { FaUniregistry } from "react-icons/fa";
import { doc, onSnapshot } from "firebase/firestore";
import { ColorRing } from "react-loader-spinner";
import "./ProfilePage.css";

const EditProfilePage = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const { otherUser, isFollow, isAddingInFollower } = useSelector(
    (state) => state.EditProfileSlice
  );

  let { userDataFromDatabase, getData, notify, isLoading, setIsLoading } =
    useContext(Store);

  let [allData] = useDbData();
  let user = allData.filter((ele) => {
    return params.userName == ele.userName;
  });
  useEffect(() => {
    dispatch(setOtherUser(...user));
  }, [params.userName, user]);

  useEffect(() => {
    if (userDataFromDatabase?.followings?.includes(params.userName)) {
      dispatch(setIsFollow(true));
    } else {
      dispatch(setIsFollow(false));
    }
  }, [otherUser]);

  async function handleFollowFunc() {
    await getData(auth.currentUser.email);
    !isPresentInFollowingList() ? pushInFollowingList() : removeFollowing();
    dispatch(setIsFollow(!isFollow));
  }

  async function pushInFollowingList() {
    getData(userDataFromDatabase.email);
    dispatch(setisAddingInFollower(true));

    // Adding in following

    let d = await UpdateDataInDataBase(
      "FOLLOWINGS",
      auth.currentUser.email,
      userDataFromDatabase.followings
        ? [...userDataFromDatabase.followings, otherUser.userName]
        : [otherUser.userName],
      notify
    );

    // Adding Follower
    let b = await UpdateDataInDataBase(
      "FOLLOWERS",
      otherUser.email,
      otherUser.followers
        ? [...otherUser.followers, userDataFromDatabase.userName]
        : [userDataFromDatabase.userName],
      notify
    );
    dispatch(setisAddingInFollower(false));
  }

  async function removeFollowing() {
    getData(userDataFromDatabase.email);
    dispatch(setisAddingInFollower(true));

    let followingListAfterRemoving = userDataFromDatabase?.followings?.filter(
      (ele) => ele != otherUser.userName
    );

    await UpdateDataInDataBase(
      "FOLLOWINGS",
      auth.currentUser.email,
      [...followingListAfterRemoving],
      notify
    );

    let followerListAfterRemoving = otherUser?.followers?.filter(
      (ele) => ele != userDataFromDatabase.userName
    );

    await UpdateDataInDataBase(
      "FOLLOWERS",
      otherUser.email,
      [...followerListAfterRemoving],
      notify
    );
    dispatch(setisAddingInFollower(false));
  }

  function isPresentInFollowingList() {
    return userDataFromDatabase?.followings?.includes(otherUser.userName);
  }

  if (!otherUser) {
    return (
      <>
        <div className="profilePage flex-grow ">
          <div className="profileDetail flex items-start gap-20 py-8">
            <div className="profileImage">
              <Skeleton
                sx={{ bgcolor: "grey.900" }}
                variant="circular"
                width={210}
                height={210}
              />
            </div>
            <div>
              <div className="profileTop flex items-center gap-6">
                <Skeleton
                  variant="text"
                  sx={{ width: "350px", fontSize: "2rem", bgcolor: "grey.900" }}
                />
              </div>
              <div className="profilemid my-3 flex gap-10 w-full">
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "2rem", bgcolor: "grey.900", width: "30%" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "2rem", bgcolor: "grey.900", width: "30%" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "2rem", bgcolor: "grey.900", width: "30%" }}
                />
              </div>
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", bgcolor: "grey.900" }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="profilePage flex-grow ">
        <div className="profileDetail flex items-start gap-20 py-8">
          <div className="profileImage">
            {otherUser?.profileUrl ? (
              <img
                src={otherUser?.profileUrl}
                alt=""
                className="w-40 rounded-full h-40"
              />
            ) : (
              <LetteredAvatar
                name={otherUser.name}
                size={100}
                radius={50}
                color="#fff"
                // backgroundColor="rgb(55,55,22)"
              />
            )}
          </div>
          <div>
            <div className="profileTop flex items-center gap-6">
              <h1 className="text-xl">{otherUser?.userName}</h1>

              {otherUser?.userName == userDataFromDatabase?.userName ? (
                <NavLink
                  to="/shutterShare/account/edit"
                  className="py-2 px-4 text-sm rounded-lg bgColor"
                >
                  Edit Profile
                </NavLink>
              ) : (
                <button
                  onClick={handleFollowFunc}
                  className={`py-2 px-4 text-sm rounded-lg ${
                    isAddingInFollower
                      ? "bg-zinc-800"
                      : isFollow
                      ? "bg-zinc-800"
                      : "bg-blue-600"
                  }`}
                >
                  {isAddingInFollower ? (
                    <ColorRing
                      visible={true}
                      height="20"
                      width="30"
                      ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors={[
                        "#e15b64",
                        "#f47e60",
                        "#f8b26a",
                        "#abbd81",
                        "#849b87",
                      ]}
                    />
                  ) : isFollow ? (
                    "Following"
                  ) : (
                    "Follow"
                  )}
                </button>
              )}
            </div>
            <div className="profilemid my-3 flex gap-10">
              <span>
                {otherUser?.posts?.length ? otherUser?.posts?.length : "0"}{" "}
                Posts{" "}
              </span>{" "}
              <span>
                {" "}
                {otherUser?.followers?.length
                  ? otherUser?.followers?.length
                  : "0"}{" "}
                Follower{" "}
              </span>{" "}
              <span>
                {" "}
                {otherUser?.followings?.length
                  ? otherUser.followings.length
                  : "0"}{" "}
                Following
              </span>
            </div>
            <div className="profileBottom">{otherUser?.name}</div>
            <div className="bio mt-3">Hii write Bio here</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfilePage;

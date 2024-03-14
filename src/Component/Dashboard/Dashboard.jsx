import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Store } from "../Datastore/Context_SignUpAndLogin";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "./Dashboard.css";
import RightDashBoard from "./RightDashBoard";
import NewFeeds from "../PostComponent/NewFeeds";
import InstaStories from "../InstaStories/InstaStories";
import { useDispatch, useSelector } from "react-redux";
import { setProfileImage } from "../Datastore/ReduxStore/AllSlices/UploadeImgToDBSlice";
import {
  setAllFeedPost,
  setUserData,
  setUserPostData,
} from "../Datastore/ReduxStore/AllSlices/DashboardSlice";
import { nanoid } from "nanoid";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { ColorRing } from "react-loader-spinner";

import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Dashboard = () => {
  let { currentUser, getData, userDataFromDatabase, setIsOpen } =
    useContext(Store);
  let { userPostData, userData } = useSelector((state) => state.DashboardSlice);

  let auth = getAuth();
  let navigateTo = useNavigate();
  const dispatch = useDispatch();
  let tempArr = [];

  const getUserData = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      tempArr.push(doc.data());
    });
    dispatch(setUserData(tempArr));
  }, []);
  // Kripa yhi ruki hai

  useEffect(() => {
    getUserData();
  }, []);

  let allFollowingList = userDataFromDatabase?.followings;

  let tempPost = [];

  useEffect(() => {
    userData.map((ele) => {
      if (allFollowingList?.includes(ele.userName)) {
        tempPost.push(...ele.posts);
      }
    });
    // console.log(tempPost);
    if (tempPost.length > 0) dispatch(setUserPostData(tempPost));
  }, [userData]);

  // console.log("userPostData", userPostData);

  // --------Route Protection for UnAuthorized Access to DashBoard--------
  useEffect(() => {
    if (auth.currentUser == null) {
      navigateTo("/login");
    }
  }, [currentUser]);

  useEffect(() => {
    async function getProfileUrl() {
      if (currentUser.email) {
        let data = await getData(currentUser.email);
        dispatch(setProfileImage(data.profileUrl));
      }
    }
    getProfileUrl();
  }, []);

  // ----------------------------------------------------------

  return (
    <div className="w-[100%] flex gap-[50px] justify-around dashboardContainer pr-[5%]">
      <div className="Dashboard flex flex-col w-[60%]  ml-[3%]">
        <div>
          <InstaStories />
        </div>
        <div className="post flex flex-col gap-5 w-[80%] max-w-[500px] mx-auto">
          {userPostData.length == 0 ? (
            <div className="h-[40vh] flex items-center justify-center">
              <h1>You Don't have any friends... Go and make some</h1>
            </div>
          ) : (
            // <SkeletonTheme baseColor="#202020" highlightColor="#444">
            //   {[1, 2, 3].map((ele) => (
            //     <div className="flex flex-col gap-2" key={nanoid()}>
            //       <div className="flex justify-between items-center">
            //         <div className="flex gap-2 items-center">
            //           <Skeleton circle={true} className="w-[40px] h-[40px]" />
            //           <div className="subLeft flex gap-1 items-center ">
            //             <p className="w-[100px]">
            //               <Skeleton count={1} />
            //             </p>
            //           </div>
            //         </div>
            //         <div></div>
            //       </div>

            //       <div className="postSkeleton   h-96 justify-center items-center flex    ">
            //         <Skeleton className="w-[100%] h-full" />
            //       </div>

            //       <div className="icons">
            //         <div className="flex gap-2 ">
            //           <Skeleton className="w-[20px]" />
            //           <Skeleton className="w-[20px]" />
            //         </div>

            //         <div>
            //           <Skeleton />
            //         </div>
            //         {/* <div
            //           className={`isShowMore? "h-auto":"h-[30px]" flex items-center`}
            //         >
            //           <span className="max-w-[60%] py-1 whitespace-nowrap inline-block overflow-ellipsis overflow-x-hidden">
            //             {" "}
            //             <Skeleton />
            //           </span>
            //         </div> */}
            //         <div>
            //           <Skeleton />
            //         </div>
            //       </div>
            //     </div>
            //   ))}
            // </SkeletonTheme>
            userPostData.map((ele) => <NewFeeds key={nanoid()} {...ele} />)
          )}
          {/* <NewFeeds key={nanoid()}   /> */}
        </div>
      </div>
      <div className="rightContainer w-[30%] min-w-[200px] max-w-[250px]">
        <RightDashBoard />
      </div>
    </div>
  );
};

export default Dashboard;

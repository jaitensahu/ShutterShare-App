import React, { useContext } from "react";
import { IoIosHome } from "react-icons/io";
import { IconContext } from "react-icons";
import { IoSearch } from "react-icons/io5";
import { FaRegCompass, FaThreads } from "react-icons/fa6";
import { RiMessengerLine } from "react-icons/ri";
import { FaRegHeart, FaRegPlusSquare, FaInstagram } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Store } from "../Datastore/Context_SignUpAndLogin";
import SearchComponent from "./DashBoard-SubComponents/SearchComponent";
import { getAuth } from "firebase/auth";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from "../Datastore/ReduxStore/AllSlices/PopUpModalSlice";
import PopUpModal from "../PostComponent/PopUp";
import PopUp2 from "../PostComponent/PopUp2";

const LeftDashBoard = () => {
  let { currentUserProfileImage } = useSelector(
    (state) => state.UploadImgToDBSlice
  );
  const dispatch = useDispatch();

  // Getting Data From Store
  let { logout, getData, isOpen, setIsOpen, userDataFromDatabase } =
    useContext(Store);
  let auth = getAuth();

  // Function to open Drawer (Search Bar Component)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  // PopComponent for Post And Live Options
  const PostAndLivePopup = () => (
    <Popup
      trigger={
        <div className="flex w-full gap-3 justify-start">
          {" "}
          <div>
            <FaRegPlusSquare style={{ fontSize: "18px" }} />{" "}
          </div>
          <h3
            className={`text-base ${
              isOpen ? "hidden" : "visible"
            } max-[1110px]:hidden`}
          >
            Create
          </h3>
        </div>
      }
      position="bottom center"
    >
      <div className="w-full popup-content rounded-md">
        <div className="popupPost w-full">
          <h3
            onClick={() => dispatch(setOpenModal(true))}
            className="w-full py-2  px-2 rounded-md hover:bg-zinc-800"
          >
            Post
          </h3>
        </div>
        <div className="live">
          <h3 className="w-full py-2 px-2 rounded-md hover:bg-zinc-800">
            Live
          </h3>
        </div>
      </div>
    </Popup>
  );

  return (
    <>
      <PopUpModal />
      <PopUp2 />
      {/* Search Bar Drawer Window */}
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="bla bla bla"
        style={{ zIndex: "", left: "0px", width: "30%" }}
        enableOverlay={false}
        overlayOpacity={0}
      >
        {/* <p>Hello world</p> */}
        <SearchComponent />
      </Drawer>
      <div
        className={`leftSidebar py-9 h-screen flex flex-col justify-between items-center fixed left-0  ${
          isOpen ? "border-none" : "border-r-2"
        } border-zinc-800 ${isOpen ? "w-20" : "w-1/6"} max-[1110px]:w-20 `}
      >
        <IconContext.Provider
          value={{ size: "1.3em", className: "react-icons" }}
        >
          <div className={`leftMiddle w-[70%] flex flex-col items-center`}>
            <div className="  instaIcon max-[1110px]:hidden">
              {isOpen ? (
                <FaInstagram
                  style={{ fontSize: "20px", marginBottom: "16px" }}
                />
              ) : (
                <h1>ShutterShare</h1>
              )}
            </div>
            <FaInstagram
              style={{ fontSize: "20px", marginBottom: "16px" }}
              className="min-[1110px]:hidden"
            />
            <NavLink
              to="/shutterShare/"
              className={({ isActive }) =>
                `icons flex gap-3 justify-start items-center hover:cursor-pointer w-full p-2 hover:bg-zinc-800  ${
                  isActive ? "font-bold" : "font-base"
                } `
              }
            >
              <div>
                <IoIosHome style={{ fontSize: "18px" }} />
              </div>
              <h3
                className={`text-base ${
                  isOpen ? "hidden" : "visible"
                } max-[1110px]:hidden  `}
              >
                Home
              </h3>
            </NavLink>
            <div onClick={toggleDrawer} className="w-full">
              <div
                onClick={() => {
                  getData(auth.currentUser.email);
                }}
                className={`icons p-2 flex gap-3 justify-start items-center w-full hover:cursor-pointer hover:bg-zinc-800 `}
              >
                <div>
                  <IoSearch
                    className="reactIcon"
                    style={{ fontSize: "18px" }}
                  />{" "}
                </div>
                <h3
                  className={`text-base ${
                    isOpen ? "hidden" : "visible"
                  } max-[1110px]:hidden`}
                >
                  Search
                </h3>
              </div>
            </div>
            <NavLink
              to="/shutterShare/Explore"
              className={({ isActive }) =>
                `icons p-2 flex gap-3 justify-start items-center w-full hover:cursor-pointer hover:bg-zinc-800  ${
                  isActive ? "font-bold" : "font-normal"
                }`
              }
            >
              <div>
                <FaRegCompass style={{ fontSize: "18px" }} />{" "}
              </div>
              <h3
                className={`text-base ${
                  isOpen ? "hidden" : "visible"
                } max-[1110px]:hidden`}
              >
                Explore
              </h3>
            </NavLink>
            <NavLink
              to="/shutterShare/reels"
              className={({ isActive }) =>
                `icons p-2 flex gap-3 justify-start items-center w-full hover:cursor-pointer hover:bg-zinc-800  ${
                  isActive ? "font-bold" : "font-normal"
                }`
              }
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="react-icons"
                height="1.3em"
                width="1.3em"
                xmlns="http://www.w3.org/2000/svg"
                style={{ fontSize: "18px" }}
              >
                <path
                  style={{ width: "100%", height: "100%" }}
                  width={100}
                  d="M35.14,0H87c9.65,0,18.43,3.96,24.8,10.32c6.38,6.37,10.34,15.16,10.34,24.82v52.61c0,9.64-3.96,18.42-10.32,24.79 l-0.02,0.02c-6.38,6.37-15.16,10.32-24.79,10.32H35.14c-9.66,0-18.45-3.96-24.82-10.32l-0.24-0.27C3.86,105.95,0,97.27,0,87.74 V35.14c0-9.67,3.95-18.45,10.32-24.82S25.47,0,35.14,0L35.14,0z M91.51,31.02l0.07,0.11h21.6c-0.87-5.68-3.58-10.78-7.48-14.69 C100.9,11.64,94.28,8.66,87,8.66h-8.87L91.51,31.02L91.51,31.02z M81.52,31.13L68.07,8.66H38.57l13.61,22.47H81.52L81.52,31.13z M42.11,31.13L28.95,9.39c-4.81,1.16-9.12,3.65-12.51,7.05c-3.9,3.9-6.6,9.01-7.48,14.69H42.11L42.11,31.13z M113.48,39.79H8.66 v47.96c0,7.17,2.89,13.7,7.56,18.48l0.22,0.21c4.8,4.8,11.43,7.79,18.7,7.79H87c7.28,0,13.9-2.98,18.69-7.77l0.02-0.02 c4.79-4.79,7.77-11.41,7.77-18.69V39.79L113.48,39.79z M50.95,54.95l26.83,17.45c0.43,0.28,0.82,0.64,1.13,1.08 c1.22,1.77,0.77,4.2-1,5.42L51.19,94.67c-0.67,0.55-1.53,0.88-2.48,0.88c-2.16,0-3.91-1.75-3.91-3.91V58.15h0.02 c0-0.77,0.23-1.55,0.7-2.23C46.76,54.15,49.19,53.72,50.95,54.95L50.95,54.95L50.95,54.95z"
                />
              </svg>
              <h3
                className={`text-base ${
                  isOpen ? "hidden" : "visible"
                } max-[1110px]:hidden`}
              >
                Reels
              </h3>
            </NavLink>
            <div
              className={`icons p-2 flex gap-3 justify-start items-center w-full hover:cursor-pointer hover:bg-zinc-800  `}
            >
              <div>
                <RiMessengerLine style={{ fontSize: "18px" }} />{" "}
              </div>
              <h3
                className={`text-base ${
                  isOpen ? "hidden" : "visible"
                } max-[1110px]:hidden`}
              >
                Messeges
              </h3>
            </div>
            <div
              className={`icons p-2 flex gap-3 justify-start items-center w-full hover:cursor-pointer hover:bg-zinc-800  `}
            >
              <div>
                <FaRegHeart style={{ fontSize: "18px" }} />{" "}
              </div>
              <h3
                className={`text-base ${
                  isOpen ? "hidden" : "visible"
                } max-[1110px]:hidden`}
              >
                Notification
              </h3>
            </div>

            <div
              className={`icons p-2 flex gap-3 justify-start items-center w-full hover:cursor-pointer hover:bg-zinc-800      `}
            >
              <PostAndLivePopup />
            </div>

            <NavLink
              to={`/shutterShare/${
                userDataFromDatabase != null
                  ? userDataFromDatabase.userName
                  : null
              }`}
              className={`icons p-2 flex gap-3 justify-start items-center w-full hover:cursor-pointer hover:bg-zinc-800  `}
            >
              <img
                src={
                  currentUserProfileImage != "" ? currentUserProfileImage : null
                }
                alt=""
                className="rounded-full w-8"
              />{" "}
              <h3
                className={`text-base ${
                  isOpen ? "hidden" : "visible"
                } max-[1110px]:hidden`}
              >
                Profile
              </h3>
            </NavLink>
          </div>

          <div className="leftBottom w-[70%]">
            <div
              className={`icons p-2 flex gap-3  justify-start items-center w-full hover:cursor-pointer hover:bg-zinc-800  `}
            >
              <div>
                <FaThreads style={{ fontSize: "18px" }} />
              </div>
              <h3
                className={`text-base ${
                  isOpen ? "hidden" : "visible"
                } max-[1110px]:hidden`}
              >
                Thread
              </h3>
            </div>
            <div
              className={`icons p-2 flex gap-3 justify-start items-center w-full hover:cursor-pointer hover:bg-zinc-900  `}
            >
              <div>
                <MdOutlineMenu style={{ fontSize: "18px" }} />
              </div>
              <h3
                className={`text-base ${
                  isOpen ? "hidden" : "visible"
                } max-[1110px]:hidden`}
                onClick={() => logout()}
              >
                Logout
              </h3>
            </div>
            {/* <PopUpModal /> */}
          </div>
        </IconContext.Provider>
      </div>
    </>
  );
};

export default LeftDashBoard;

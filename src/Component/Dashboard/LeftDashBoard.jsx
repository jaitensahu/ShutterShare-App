import React, { useContext, useState } from "react";
import { IoIosHome } from "react-icons/io";
import { IconContext } from "react-icons";
import { IoSearch } from "react-icons/io5";
import { FaRegCompass } from "react-icons/fa6";
import { RiMessengerLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { MdOutlineMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Store } from "../Datastore/Context_SignUpAndLogin";
import reelIcon from "../../assets/instagram-reels-icon.png";
import SearchComponent from "./DashBoard-SubComponents/SearchComponent";
import { getAuth } from "firebase/auth";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { FaInstagram } from "react-icons/fa";
import "./Dashboard.css";
import zIndex from "@mui/material/styles/zIndex";

const LeftDashBoard = () => {
  let { logout, getData } = useContext(Store);
  let auth = getAuth();
  // console.log(auth.currentUser.photoURL);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="bla bla bla"
        style={{ zIndex: "-1", left: "0px", width: "30%" }}
        enableOverlay={false}
        overlayOpacity={0}
      >
        {/* <p>Hello world</p> */}
        <SearchComponent />
      </Drawer>
      <div
        className={`leftSidebar  px-5 py-9 h-screen flex flex-col justify-between fixed left-0  ${
          isOpen ? "border-none" : "border-r-2"
        } border-zinc-800 ${isOpen ? "w-20" : "w-1/6"} `}
      >
        <IconContext.Provider
          value={{ size: "1.3em", className: "react-icons" }}
        >
          <div className={`leftMiddle w-full flex flex-col items-center`}>
            <div className="  instaIcon">
              {isOpen ? (
                <FaInstagram
                  style={{ fontSize: "20px", marginBottom: "16px" }}
                />
              ) : (
                <h1>ShutterShare</h1>
              )}
            </div>
            <NavLink
              to="/shutterShare/dashboard"
              className={({ isActive }) =>
                `icons flex gap-3 justify-start items-center hover:cursor-pointer w-full p-2 hover:bg-zinc-800  ${
                  isActive ? "font-bold" : "font-base"
                } `
              }
            >
              <div>
                <IoIosHome style={{ fontSize: "18px" }} />
              </div>
              <h3 className={`text-base ${isOpen ? "hidden" : "visible"}`}>
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
                <h3 className={`text-base ${isOpen ? "hidden" : "visible"}`}>
                  Search
                </h3>
              </div>
            </div>

            <NavLink
              to="/shutterShare/da/Explore"
              className={({ isActive }) =>
                `icons p-2 flex gap-3 justify-start items-center w-full hover:cursor-pointer hover:bg-zinc-800  ${
                  isActive ? "font-bold" : "font-normal"
                }`
              }
            >
              <div>
                <FaRegCompass style={{ fontSize: "18px" }} />{" "}
              </div>
              <h3 className={`text-base ${isOpen ? "hidden" : "visible"}`}>
                Explore
              </h3>
            </NavLink>

            <NavLink
              to="/shutterShare/ads/reels"
              className={({ isActive }) =>
                `icons p-2 flex gap-3 justify-start items-center w-full hover:cursor-pointer hover:bg-zinc-800  ${
                  isActive ? "font-bold" : "font-normal"
                }`
              }
            >
              <img src={reelIcon} alt="" className="reelIcon" />{" "}
              <h3 className={`text-base ${isOpen ? "hidden" : "visible"}`}>
                Reels
              </h3>
            </NavLink>

            <div
              className={`icons p-2 flex gap-3 justify-start items-center w-full hover:cursor-pointer hover:bg-zinc-800  `}
            >
              <div>
                <RiMessengerLine style={{ fontSize: "18px" }} />{" "}
              </div>
              <h3 className={`text-base ${isOpen ? "hidden" : "visible"}`}>
                Messeges
              </h3>
            </div>

            <div
              className={`icons p-2 flex gap-3 justify-start items-center w-full hover:cursor-pointer hover:bg-zinc-800  `}
            >
              <div>
                <FaRegHeart style={{ fontSize: "18px" }} />{" "}
              </div>
              <h3 className={`text-base ${isOpen ? "hidden" : "visible"}`}>
                Notification
              </h3>
            </div>

            <div
              className={`icons p-2 flex gap-3 justify-start items-center w-full hover:cursor-pointer hover:bg-zinc-800      `}
            >
              <div>
                <FaRegPlusSquare style={{ fontSize: "18px" }} />{" "}
              </div>
              <h3 className={`text-base ${isOpen ? "hidden" : "visible"}`}>
                Create
              </h3>
            </div>
            <div
              to="/shutterShare/ads/reels"
              className={`icons p-2 flex gap-3 justify-start items-center w-full hover:cursor-pointer hover:bg-zinc-800  `}
            >
              <img
                src={auth.currentUser !=null ? auth.currentUser.photoURL: null}
                alt=""
                className="rounded-full w-8"
              />{" "}
              <h3 className={`text-base ${isOpen ? "hidden" : "visible"}`}>
                Profile
              </h3>
            </div>
          </div>

          <div className="leftBottom">
            <div
              className={`icons p-2 flex gap-3 justify-start items-center w-full hover:cursor-pointer hover:bg-zinc-800  `}
            >
              <div>
                <FaThreads style={{ fontSize: "18px" }} />
              </div>
              <h3 className={`text-base ${isOpen ? "hidden" : "visible"}`}>
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
                className={`text-base ${isOpen ? "hidden" : "visible"}`}
                onClick={() => logout()}
              >
                Logout
              </h3>
            </div>
          </div>
        </IconContext.Provider>
      </div>
    </>
  );
};

export default LeftDashBoard;

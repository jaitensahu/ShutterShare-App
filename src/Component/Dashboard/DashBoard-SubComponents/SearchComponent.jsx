import React, { useContext, useEffect, useRef, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import "../Dashboard.css";
import { Store } from "../../Datastore/Context_SignUpAndLogin";
import useDbData from "../../CustomHooks/useDbData";
import { useDispatch, useSelector } from "react-redux";
import {
  debouncedHandleInput,
  setSearchBarInp,
} from "../../Datastore/ReduxStore/AllSlices/DashboardSlice";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
const SearchComponent = () => {
  let { isOpen } = useContext(Store);
  let searchInpRef = useRef("");
  console.log("hiiii", isOpen);

  const { searchBarInp, filteredData } = useSelector(
    (state) => state.DashboardSlice
  );
  // console.log(searchBarInp);
  const [userData] = useDbData();
  const dispatch = useDispatch();
  let navigateTo = useNavigate();

  function showUser(user) {
    navigateTo(`/shutterShare/${user.userName}`);
  }

  return (
    <div className="SearchComponent min-w-[430px] w-full h-screen pl-[80px] border-r-2 relative z-10 border-zinc-800">
      <h3 className="text-2xl font-semibold pt-6 pb-10">Search</h3>
      <div className="searchForm rounded-xl flex w-11/12 items-center bg-zinc-800 p-1 ml-3  mb-4">
        <input
          ref={searchInpRef}
          type="text"
          placeholder="Search"
          className="searchBar w-11/12 outline-none bg-transparent border-0"
          onChange={(e) => {
            dispatch(setSearchBarInp(e.target.value));
            debouncedHandleInput(dispatch, userData, e.target.value);
          }}
          value={searchBarInp}
        />
        <IoIosCloseCircle
          size={20}
          onClick={() => dispatch(setSearchBarInp(""))}
        />
      </div>
      <hr className=" " />

      <div>
        {filteredData.map((user) => {
          return (
            <div
              key={nanoid() + "abc"}
              onClick={() => showUser(user)}
              className="flex gap-2 py-2 px-4 items-center"
            >
              <img
                className="w-[50px] h-[50px] rounded-full"
                src={user.profileUrl}
                alt=""
              />
              <p className="font-semibold">{user.userName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchComponent;

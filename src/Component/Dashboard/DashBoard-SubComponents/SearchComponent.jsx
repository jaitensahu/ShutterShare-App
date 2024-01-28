import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import "../Dashboard.css";
const SearchComponent = () => {
  return (
    <div className="SearchComponent w-full h-screen pl-20 border-r-2 border-zinc-800">
      <h3 className="text-2xl font-semibold pt-6 pb-10">Search</h3>
      <div className="searchForm rounded-xl flex w-11/12 items-center bg-zinc-800 border-b-2 border-zinc-800 p-3  mb-4">
        <input
          type="text"
          placeholder="Search"
          className="searchBar w-11/12 outline-none bg-transparent"
        />
        <IoIosCloseCircle size={20} />
      </div>
      <hr className="bg-zinc-800 text-zinc-800"/>
    </div>
  );
};

export default SearchComponent;

import { nanoid } from "@reduxjs/toolkit";
import React from "react";

const InstaStories = () => {
  return (
    <div className="stories flex w-[100%] overflow-x-scroll pt-[30px] pb-[10px] z-[1000]">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((ele) => {
        return (
          <div key={nanoid()} className="w-[80px] flex flex-col items-center">
            <img
              src="https://marketplace.canva.com/EAFXS8-cvyQ/1/0/1600w/canva-brown-and-light-brown%2C-circle-framed-instagram-profile-picture-2PE9qJLmPac.jpg"
              alt=""
              className="w-[75%] rounded-full"
            />
            <h2 className="whitespace-nowrap overflow-hidden overflow-ellipsis w-[90%] text-[14px]">
              prodfsdfsdfasddsdsfsdfsdffile name
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default InstaStories;

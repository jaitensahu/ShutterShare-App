import React from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { RiFontSize } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { TbLocationShare } from "react-icons/tb";
import { IconContext } from "react-icons";

const PostComponent = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img
            src="https://marketplace.canva.com/EAFXS8-cvyQ/1/0/1600w/canva-brown-and-light-brown%2C-circle-framed-instagram-profile-picture-2PE9qJLmPac.jpg"
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <div className="subLeft">
            <p className="">itsJaiten</p>
            <p className="text-sm">abc jkjd</p>
          </div>
        </div>
        <div>
          <AiOutlineEllipsis style={{ width: "32px", height: "28px" }} />
        </div>
      </div>

      <div className="postImageORvideo">
        <img
          className="w-[480px]"
          src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt=""
        />
      </div>
      <IconContext.Provider value={{ size: "1.3em"}}>
        <div className="icons">
          <div
            className="flex justify-between
        "
          >
            <div className="flex gap-2">
              <FaRegHeart />
              <FaRegComment />
              <TbLocationShare />
            </div>
            <FaRegBookmark />
          </div>
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default PostComponent;

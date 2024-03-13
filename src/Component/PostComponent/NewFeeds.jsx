import React, { memo, useContext, useEffect, useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { RiFontSize } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { TbLocationShare } from "react-icons/tb";
import { IconContext } from "react-icons";
import "./PopUpModal.css";
import { Store } from "../Datastore/Context_SignUpAndLogin";
import { UpdateDataInDataBase } from "../Datastore/ReduxStore/AllSlices/UploadToDB_ExtraSlice";
import { FaHeart } from "react-icons/fa";
import useLikedPost from "../CustomHooks/useLikedPost";

const NewFeeds = (post) => {
  let [likeCount, setLikeCount] = useState(0);
  let [isLiked, setLiked] = useState(false);
  let [comment, setComment] = useState("");
  let [commentArr, setCommentArr] = useState([]);
  let [commentCount, setCommentCount] = useState(0);

  let [posts] = useLikedPost();

  useEffect(() => {
    posts.map((ele) => {
      if (ele.id == post._id) {
        setLikeCount(ele.likeBy.length);
        setCommentCount(ele.comments.length);
        setLiked(ele.likeBy.includes(userDataFromDatabase.userName));
      }
    });
  }, [posts]);

  // Calculate Duration of Post
  let duration = Date.now() - post.uploadTimeStamp;
  duration = Math.floor(duration / (1000 * 60 * 60));
  let timeToShow;
  if (duration > 0 && duration <= 24) {
    timeToShow = duration + "h";
  } else {
    timeToShow = Math.floor(duration / 24) + "d";
  }

  let { userDataFromDatabase, notify } = useContext(Store);

  async function handleLiked(id) {
    UpdateDataInDataBase(
      "ALLPOSTS",
      id,
      { userName: userDataFromDatabase.userName, isLiked },
      notify
    );
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!isLiked);
  }

  function addComment(id) {
    let commentObj = {
      commenterUserName: userDataFromDatabase.userName,
      comment: comment,
      timeStamp: Date.now(),
      commenterProfile: userDataFromDatabase.profileUrl,
    };
    UpdateDataInDataBase("COMMENT", id, commentObj, notify);
    let tempArr = [...commentArr];
    if (commentArr.length >= 2) {
      tempArr.shift();
    }
    setCommentArr([...tempArr, commentObj]);
    setComment("");
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img
            src={`${
              post.profileUrl == ""
                ? "https://www.freeiconspng.com/uploads/profile-icon-9.png"
                : post.profileUrl
            }`}
            alt=""
            className={`w-10 h-10 rounded-full ${
              post.profileUrl == ""
                ? "border-1 border-white rounded-full"
                : null
            }`}
          />
          <div className="subLeft flex gap-1 items-center ">
            <p className="">{post.userName}</p>{" "}
            <p className="text-zinc-500 text-[14px]">{timeToShow}</p>
          </div>
        </div>
        <div>
          <AiOutlineEllipsis style={{ width: "32px", height: "28px" }} />
        </div>
      </div>

      <div className="postImageORvideo h-96 border flex justify-center items-center border-zinc-800">
        <img
          className="w-[480px] h-full object-contain"
          src={post.url}
          alt=""
        />
      </div>
      <IconContext.Provider value={{ size: "1.3em" }}>
        <div className="icons">
          <div
            className="flex justify-between
        "
          >
            <div className="flex gap-2">
              <span onClick={() => handleLiked(post._id)}>
                {isLiked ? (
                  <FaHeart style={{ color: "red" }} />
                ) : (
                  <FaRegHeart />
                )}
              </span>
              <FaRegComment />
              <TbLocationShare />
            </div>
            <FaRegBookmark />
          </div>
          <div>{likeCount == 0 ? null : `${likeCount} likes`}</div>
          <div className={`isShowMore? "h-auto":"h-[30px]" flex items-center`}>
            <span className="max-w-[60%] py-1 whitespace-nowrap inline-block overflow-ellipsis overflow-x-hidden">
              {" "}
              {post.userName} {post.desc}
            </span>
            {post.desc.length > 10 ? <span className="text-zinc-600">more</span>:null}
          </div>
          {commentCount > 2 ? (
            <div className="text-gray-500">
              View all {commentCount} comments
            </div>
          ) : null}
          <div className=" ">
            {commentArr.length != 0
              ? commentArr.map((ele) => {
                  return (
                    <div className="text-sm">
                      <span>{ele.commenterUserName}</span>
                      <span>{ele.comment}</span>
                    </div>
                  );
                })
              : null}
          </div>
          <div className="flex text-sm">
            <input
              type="text"
              value={comment}
              placeholder="Add a comment..."
              className="commentInput bg-transparent border-0 border-b-2 text-sm"
              onChange={(e) => {
                setComment(e.target.value);
              }}
              onKeyDown={(e) => {
                e.code == "Enter" ? addComment(post._id) : null;
              }}
            />
            <div className="flex items-center gap-2">
              <div>😃</div>
              {comment.length != 0 ? (
                <button
                  onClick={() => addComment(post._id)}
                  className="text-blue-500 font-bold"
                >
                  Post
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default memo(NewFeeds);

import React, { useContext, useEffect, useState } from "react";
import { Store } from "../Datastore/Context_SignUpAndLogin";
import { auth } from "../firebase";
import "./ProfilePage.css";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { Button, Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowPost,
  setShowPostModal,
} from "../Datastore/ReduxStore/AllSlices/PopUpModalSlice";
import { HiDotsHorizontal } from "react-icons/hi";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { nanoid } from "nanoid";
import useLikedPost from "../CustomHooks/useLikedPost";

const Posts = () => {
  const { getData, userDataFromDatabase } = useContext(Store);
  const { otherUser } = useSelector((state) => state.EditProfileSlice);
  let [postsLikeComments] = useLikedPost();
  let [comments, setComments] = useState([]);
  // let [commentCount, setCommentCount] = useState(0);
  // let [likeCount, setLikeCount] = useState(0);
  console.log(comments);
  const { showPostModal, showPost } = useSelector(
    (state) => state.PopUpModalSlice
  );

  const dispatch = useDispatch();
  useEffect(() => {
    getData(auth.currentUser?.email);
  }, []);
  let post;

  function handleOnClick(id) {
    let likeAndComments = postsLikeComments.find((ele) => ele.id == id);
    console.log(likeAndComments);
    if (likeAndComments) {
      setComments([...likeAndComments.comments]);
    } else {
      setComments([]);
    }
    post = otherUser?.posts?.find((ele) => ele._id == id);
    dispatch(setShowPost(post));
  }
  let likeCount = 0;
  let commentsCount = 0;
  console.log(otherUser);
  return (
    <>
      <Modal
        className="Modal postModal relative"
        show={showPostModal}
        size={"5xl"}
        onClose={() => {
          dispatch(setShowPostModal(false));
        }}
      >
        <Modal.Header className="modalHeader postModalHeader absolute top-[-20px] right-[-30px]"></Modal.Header>
        <Modal.Body className="relative postModalBody">
          <div className=" flex h-[80vh] relative">
            <div className="h-[80vh] flex fixed">
              <LazyLoadImage
                effect="blur"
                className=" w-[100%] h-[100%] max-w-[450px] object-contain"
                src={showPost?.url}
                alt=""
              />
            </div>
            <div className="flex justify-end w-[100%] h-[100%] postDetailOnRight">
              <div className="w-[50%] pr-5">
                <div className="flex justify-between py-4 border-b-2">
                  <div className="flex gap-2 items-start ">
                    <LazyLoadImage
                      effect="blur"
                      src={otherUser?.profileUrl}
                      className="w-[30px] rounded-full"
                      alt=""
                    />
                    <p>{otherUser?.userName}</p>
                  </div>
                  <HiDotsHorizontal />
                </div>

                <div className="max-h-[400px] overflow-y-scroll desc_comments">
                  {showPost?.desc != "" ? (
                    <div className="flex gap-2 items-start pt-3 ">
                      <LazyLoadImage
                        src={otherUser?.profileUrl}
                        className="w-[30px] rounded-full"
                        alt=""
                      />
                      <p>
                        {otherUser?.userName} {showPost?.desc}
                      </p>
                    </div>
                  ) : null}
                  {comments.length != 0
                    ? comments.map((ele) => {
                        return (
                          <div key={nanoid()} className="comments">
                            <div className="flex gap-2 items-start pt-3  ">
                              <img
                                src={ele?.commenterProfileUrl}
                                className="w-[30px] rounded-full"
                                alt=""
                              />
                              <p>
                                {ele.commenterUserName} {ele?.comment}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    : "No Comments Yet"}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={() => dispatch(setShowPostModal(false))}>
            I accept
          </Button>
          <Button
            color="gray"
            onClick={() => dispatch(setShowPostModal(false))}
          >
            Decline
          </Button>
        </Modal.Footer> */}
      </Modal>

      <div className="flex w-[80%] gap-1 flex-wrap">
        {otherUser?.posts
          ? otherUser?.posts.map((ele) => {
              {
                likeCount = 0;
                commentsCount = 0;
                console.log(postsLikeComments);
                let currPost = postsLikeComments.find(
                  (item) => item.id == ele._id
                );
                console.log(!currPost);
                if (currPost) {
                  likeCount = currPost.likeBy.length;
                  commentsCount = currPost.comments.length;
                }
              }
              return (
                <div
                  // onClick={(e)=>{console.log(e);}}
                  onClick={() => {
                    // console.log(ele._id);
                    handleOnClick(ele._id);
                    dispatch(setShowPostModal(true));
                  }}
                  key={ele?._id}
                  className="postItems w-[310px] h-[310px] overflow-hidden flex items-center relative cursor-pointer"
                >
                  <LazyLoadImage
                    effect="blur"
                    className="w-full h-full object-cover"
                    src={ele?.url}
                    alt=""
                  />
                  <div className="likeCommentScreen flex gap-4 justify-center items-center text-white font-bold absolute z-10 top-0 w-full h-full">
                    <p className="flex items-center gap-2">
                      <span>
                        <FaHeart style={{ fontSize: "25px" }} />
                      </span>
                      <span>{likeCount}</span>
                    </p>
                    <p className="flex items-center gap-2 ">
                      <span>
                        {" "}
                        <FaComment style={{ fontSize: "25px" }} />
                      </span>
                      <span>{commentsCount}</span>
                    </p>
                  </div>
                </div>
              );
            })
          : "No Post Yet"}
      </div>
    </>
  );
};

export default Posts;

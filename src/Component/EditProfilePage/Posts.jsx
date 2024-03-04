import React, { useContext, useEffect } from "react";
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
import useDbData from "../CustomHooks/useDbData";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


const Posts = () => {
  const { getData, userDataFromDatabase } = useContext(Store);
  const { otherUser } = useSelector((state) => state.EditProfileSlice);

  const { showPostModal, showPost } = useSelector(
    (state) => state.PopUpModalSlice
  );

  const dispatch = useDispatch();
  useEffect(() => {
    getData(auth.currentUser?.email);
  }, []);
  let post;

  function handleOnClick(id) {
    post = otherUser?.posts.find((ele) => ele._id == id);
    dispatch(setShowPost(post));
  }

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
            <div className="h-[80vh]  fixed">
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
                  {showPost?.comments.length != 0
                    ? showPost?.comments.map((ele) => {
                        return (
                          <div className="comments">
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
              return (
                <div
                  // onClick={(e)=>{console.log(e);}}
                  onClick={() => {
                    // console.log(ele._id);
                    handleOnClick(ele._id);
                    dispatch(setShowPostModal(true));
                  }}
                  key={ele?._id}
                  className="postItems w-[310px] h-[310px] overflow-hidden relative cursor-pointer"
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
                      <span>{ele.likesCount}</span>
                    </p>
                    <p className="flex items-center gap-2 ">
                      <span>
                        {" "}
                        <FaComment style={{ fontSize: "25px" }} />
                      </span>
                      <span>{ele.comments.length}</span>
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

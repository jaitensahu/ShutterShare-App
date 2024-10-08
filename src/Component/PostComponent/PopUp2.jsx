import React, { useContext } from "react";
import { Button, Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import {
  setDescription,
  setDiscardModal,
  setEmojiPicker,
  setOpenModal,
  setOpenModal2,
} from "../Datastore/ReduxStore/AllSlices/PopUpModalSlice";
import {
  setPostImgUrl,
  setPostObject,
} from "../Datastore/ReduxStore/AllSlices/UploadeImgToDBSlice";
import { UpdateDataInDataBase } from "../Datastore/ReduxStore/AllSlices/UploadToDB_ExtraSlice";
import { auth } from "../firebase";
import { Store } from "../Datastore/Context_SignUpAndLogin";
import { nanoid } from "@reduxjs/toolkit";
import { ToastContainer } from "react-toastify";
import { setPost } from "../Datastore/ReduxStore/AllSlices/EditProfileSlice";

const PopUp2 = () => {
  const dispatch = useDispatch();
  const { postOnProfile } = useSelector(
    (state) => state.EditProfileSlice
  );
  const { openModal2, openPicker, postDescription } = useSelector(
    (state) => state.PopUpModalSlice
  );

  const { postImageUrl, postObject } = useSelector(
    (state) => state.UploadImgToDBSlice
  );
  const { getData, userDataFromDatabase, isLoading, setIsLoading, notify } =
    useContext(Store);
  // console.log(getData, userDataFromDatabase.post);
  async function shareNreset() {
    getData(auth.currentUser.email);
    dispatch(setDiscardModal(false));
    dispatch(setOpenModal(false));
    dispatch(setOpenModal2(false));
    dispatch(setPostImgUrl(null));
    dispatch(setEmojiPicker(false));
    dispatch(setDescription(""));
    // let timeStamp = new Date().getFullYear();
    const postObj = {
      _id: nanoid(),
      url: postImageUrl,
      profileUrl: userDataFromDatabase.profileUrl,
      userName: userDataFromDatabase.userName,
      email:userDataFromDatabase.email,
      desc: postDescription,
      uploadTimeStamp: new Date().getTime(),
      comments: [
        {
          commenterUserName: "amalrana",
          comment: "nice pic dear",
          commenterProfileUrl: "",
          commentTime: "",
        },
        {
          commenterUserName: "sahuji45",
          comment: "do rupay ki pepsi mera bhai sexy",
          commenterProfileUrl: "",
          commentTime: "",
        },
      ],
      likesCount: 0,
    };
    dispatch(setPostObject(postObj));
   let updatedPostArray = [...postOnProfile, postObj]
    dispatch(setPost(updatedPostArray));
    setIsLoading(true);
    console.log(
      userDataFromDatabase,
      userDataFromDatabase.posts ? "true" : "false"
    );

    await UpdateDataInDataBase(
      "POST",
      auth.currentUser.email,
      userDataFromDatabase.posts
        ? [...userDataFromDatabase.posts, postObj]
        : [postObj],
      notify
    );
    setIsLoading(false);
  }

  return (
    <>
      <ToastContainer />
      <Modal
        className="Modal bg-black"
        show={openModal2}
        onClose={() => dispatch(setDiscardModal(true))}
      >
        <Modal.Header className="modalHeader">Create New Post</Modal.Header>
        <Modal.Body className="modalBody">
          <div className="flex w-[100%]">
            <div className="w-[50%]">
              <img src={postImageUrl} alt="" className="w-[100%]" />
            </div>
            <div className="postContent w-[50%]">
              <div className="flex items-center gap-2">
                <img
                  className="w-[40px] h-[40px] rounded-full"
                  src={postImageUrl}
                  alt=""
                />
                <p className=" ">its_jaiten</p>
              </div>
              <textarea
                value={postDescription}
                onChange={(e) => dispatch(setDescription(e.target.value))}
                placeholder="Write a caption..."
                className="w-full outline-none captionArea  "
              ></textarea>
              <p
                className="text-right text-[20px] cursor-pointer"
                onClick={() => {
                  dispatch(setEmojiPicker(!openPicker));
                }}
              >
                😀
              </p>
              <div className="absolute w-[45%] z-[1000]">
                <EmojiPicker
                  onEmojiClick={(e) => {
                    dispatch(setDescription(postDescription + e.emoji));
                  }}
                  open={openPicker}
                  style={{ width: "100%", height: "200px" }}
                />
              </div>
            </div>
          </div>
          {/* <Button onClick={() => dispatch(setOpenModal2(false))}>
            Upload a Photo
          </Button> */}
        </Modal.Body>
        <Modal.Footer className="justify-between modalFooter border-0">
          <Button color="gray" onClick={() => dispatch(setDiscardModal(true))}>
            Discard
          </Button>
          <Button
            color="gray"
            onClick={() => {
              shareNreset();
              console.log("uploaded successfully");
              // dispatch(setDiscardModal(true))
            }}
          >
            Share
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopUp2;

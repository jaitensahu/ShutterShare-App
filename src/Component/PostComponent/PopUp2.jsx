import React from "react";
import { Button, Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import {
  setDescription,
  setDiscardModal,
  setEmojiPicker,
  setOpenModal2,
} from "../Datastore/ReduxStore/AllSlices/PopUpModalSlice";

const PopUp2 = () => {
  const dispatch = useDispatch();
  const { openModal2, openPicker, postDescription } = useSelector(
    (state) => state.PopUpModalSlice
  );
  const { postImageUrl } = useSelector((state) => state.UploadImgToDBSlice);
 

  return (
    <>
      {/* <Button onClick={() => dispatch(setOpenModal(true))}>Toggle modal</Button> */}
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
                  onEmojiClick={(e) => { dispatch(setDescription(postDescription+e.emoji)) }}
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
          <Button color="gray" onClick={() => dispatch(setDiscardModal(true))}>
            Share
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopUp2;

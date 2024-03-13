"use client";

import { Button, Modal, Flowbite } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDiscardModal,
  setOpenModal,
  setOpenModal2,
} from "../Datastore/ReduxStore/AllSlices/PopUpModalSlice";
import "./PopUpModal.css";
import { UploadImgGetUrl } from "../Datastore/ReduxStore/AllSlices/UploadToDB_ExtraSlice";
import { setPostImgUrl } from "../Datastore/ReduxStore/AllSlices/UploadeImgToDBSlice";
import { Store } from "../Datastore/Context_SignUpAndLogin";
import { DiscardPopUp } from "./DiscardPopUp";

const customTheme = {
  button: {
    color: {
      primary: "bg-red-500 hover:bg-red-600",
    },
  },
};

export default function PopUpModal() {
  //   const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { openModal, imageToPost } = useSelector(
    (state) => state.PopUpModalSlice
  );
  const { setIsLoading } = useContext(Store);

  const { postImageUrl } = useSelector((state) => state.UploadImgToDBSlice);

  return (
    <>
      {/* <Button onClick={() => dispatch(setOpenModal(true))}>Toggle modal</Button> */}
      {/* <Flowbite theme={{ theme: customTheme }}> */}
      <DiscardPopUp />
      <Modal
        className="Modal"
        show={openModal}
        onClose={() => {
          dispatch(setDiscardModal(true));
        }}
      >


        <Modal.Header
          // style={{ backgroundColor: "red", padding: "0" }}
          id="modalHeader"
          className="modalHeader"
        >
          Create New Post
        </Modal.Header>
        <Modal.Body className="modalBody">
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={(e) => {
              dispatch(
                UploadImgGetUrl({
                  imageToBeUploaded: e.target.files[0],
                  loader: setIsLoading,
                  setter: setPostImgUrl,
                })
              );
            }}
          />
          {postImageUrl ? (
            <img src={postImageUrl} alt="" />
          ) : (
            <label
              htmlFor="file"
              className="w-[100%] flex flex-col  items-center border-3 border-dashed border-blue-600"
            >
              <div className="w-[25%]">
                <img
                  src="https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png"
                  alt=""
                />
              </div>
              <span className="text-black"> Upload a File</span>
            </label>
          )}

          {/* <Button onClick={() => {}}>Upload a Photo</Button> */}
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <Button
            color="gray"
            onClick={() => {
              // dispatch(setOpenModal(false));
              dispatch(setDiscardModal(true));
            }}
          >
            Discard
          </Button>
          <Button
            disabled={postImageUrl ? false : true}
            color="gray"
            onClick={() => {
              dispatch(setOpenModal(false));
              dispatch(setOpenModal2(true));
            }}
          >
            Next
          </Button>
        </Modal.Footer>
      </Modal>
      {/* </Flowbite> */}
    </>
  );
}

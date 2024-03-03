"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { setDescription, setDiscardModal, setEmojiPicker, setOpenModal, setOpenModal2 } from "../Datastore/ReduxStore/AllSlices/PopUpModalSlice";
import { setPostImgUrl } from "../Datastore/ReduxStore/AllSlices/UploadeImgToDBSlice";

export const DiscardPopUp = ()=> {
    // const [openDiscardModal, setDiscardModal] = useState(false);
    const { openDiscardModal } = useSelector(state => state.PopUpModalSlice);
    const dispatch = useDispatch();
  return (
    <>
      {/* <Button onClick={() => dispatch(setDiscardModal(true))}>Toggle modal</Button> */}
      <Modal
        show={openDiscardModal}
        size="md"
        onClose={() => dispatch(setDiscardModal(false))}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to discard this post?
            </h3>
            <div className="flex justify-center gap-4">
                          <Button color="failure" onClick={() => {
                              dispatch(setDiscardModal(false));
                              dispatch(setOpenModal(false));
                              dispatch(setOpenModal2(false));
                              dispatch(setPostImgUrl(null));
                              dispatch(setEmojiPicker(false));
                              dispatch(setDescription(""));
                              dispatch(setPostImgUrl(""));
              }}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => dispatch(setDiscardModal(false))}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

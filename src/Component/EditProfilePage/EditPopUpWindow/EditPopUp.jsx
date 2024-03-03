import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Store } from "../../Datastore/Context_SignUpAndLogin";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { auth, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { nanoid } from "@reduxjs/toolkit";
import {
  setProfileImage,
  setUrl,
} from "../../Datastore/ReduxStore/AllSlices/UploadeImgToDBSlice";
import { UploadImgGetUrl } from "../../Datastore/ReduxStore/AllSlices/UploadToDB_ExtraSlice";
// import { UploadImgGetUrl } from "../../Datastore/ReduxStore/AllSlices/UploadToDBSlice";

const EditPopUp = () => {
  let { ProfileImgUrlFromDb } = useSelector((state) => state.UploadImgToDBSlice);
 
  let dispatch = useDispatch();
  let { userDataFromDatabase, UpdateDataInDataBase, setIsLoading, notify } =
    useContext(Store);

  const [anchor] = React.useState(null);
  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;
  let description = useRef();
  let gender = useRef();

  // Change Profile Imagee PopUp Component
  const ChangePhotoPopUp = () => (
    <Popup
      trigger={
        <button
          className="bg-blue-600 font-bold text-sm py-2 px-4 rounded-md"
          aria-describedby={id}
          type="button"
        >
          {" "}
          Change Photo
        </button>
      }
      position="center"
    >
      {(close) => (
        <div className="changephoto min-w-[380px] py-5 w-1/3 fixed top-1/2 flex flex-col items-center gap-2 p-4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-inherit text-center ">
          <h1 className="text-2xl ">Change Profile Photo</h1>
          <input
            type="file"
            id="img"
            className="hidden"
            onChange={(e) => {
              dispatch(
                UploadImgGetUrl({
                  imageToBeUploaded: e.target.files[0],
                  loader: setIsLoading,
                  setter: setUrl,
                })
              );
            }}
          />
          <label
            htmlFor="img"
            className="font-bold text-blue-500 cursor-pointer"
          >
            Upload Photo
          </label>
          <h2 className="font-bold text-red-500 cursor-pointer">
            Remove Current Photo
          </h2>
          <h2 onClick={close} className="cursor-pointer">
            Cancle
          </h2>
        </div>
      )}
    </Popup>
  );

  let fileUpload = (event) => {
 
    let src = event.target.value.getAsDataURL();
    this.setState({
      image: src,
    });
  };

  return (
    <div className="w-full ">
      {/* <img src={image} alt="" /> */}
      <div className="w-1/2 m-auto p-7 flex flex-col gap-8 min-w-[512px]">
        <h1 className="w-full font-bold text-xl">Edit profile</h1>
        <div className="flex mt-4 justify-between items-center bg-zinc-800 p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <img
              src={ProfileImgUrlFromDb}
              alt=""
              className="rounded-full w-16"
            />
            <div>
              <h3 className="font-bold text-lg">
                {userDataFromDatabase.userName}
              </h3>
              <p>{userDataFromDatabase.name}</p>
            </div>
          </div>
          <div>
            <ChangePhotoPopUp className="fixed" />
          </div>
        </div>
        <div>
          <h3>Bio</h3>
          <textarea
            name=""
            placeholder="Bio"
            className="p-2 w-full rounded-lg"
            id=""
            ref={description}
          ></textarea>
        </div>

        <div>
          <select name="" id="" className="w-full p-2 rounded-lg" ref={gender}>
            <option value="">select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="">Prefer not to say</option>
          </select>
        </div>

        <button
          className="py-2 px-28 bg-blue-600 rounded-lg w-1/2 m-auto"
          onClick={() => {
            UpdateDataInDataBase(auth.currentUser.email, {
              profielUrl: ProfileImgUrlFromDb,
              description: description.current.value,
              gender: gender.current.value,
            });
            dispatch(setProfileImage(ProfileImgUrlFromDb));
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditPopUp;

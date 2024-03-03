import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { ref } from "firebase/storage";
import { storage } from "../../../firebase";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { setUrl } from "./UploadeImgToDBSlice";
import { onLog } from "firebase/app";

export const UploadImgGetUrl = createAsyncThunk(
  "UploadToDBSlice/Uploading",
  async (actions, { dispatch }) => {
    let imageToBeUploaded = actions.imageToBeUploaded;
    let setter = actions.setter;
    let loader = actions.loader;
    console.log("Uploading to db");

    if (imageToBeUploaded == "") return;
    loader(true);
    try {
      let imagesRef = ref(
        storage,
        `images/${imageToBeUploaded.name + nanoid()}`
      );
      const snapshot = await uploadBytes(imagesRef, imageToBeUploaded);
      const url = await getDownloadURL(snapshot.ref);
      dispatch(setter(url));
      loader(false);
      console.log("Uploaded to DB and Got the URL");
    } catch (error) {
      console.log(error);
      loader(false);
    }
  }
);

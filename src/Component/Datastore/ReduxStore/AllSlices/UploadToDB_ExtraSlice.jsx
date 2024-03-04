import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { ref } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { setPostObject, setUrl } from "./UploadeImgToDBSlice";
import { onLog } from "firebase/app";
import { doc, updateDoc } from "firebase/firestore";

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

export const UpdateDataInDataBase = async (action, email, updates) => {
 
  try {
    const UpdatedData = doc(db, "users", email);
    if (action == "POST") {
      let abc = await updateDoc(UpdatedData, { posts: updates });
    } else if(action == "FOLLOWINGS"){
        await updateDoc(UpdatedData, { followings: updates });
    } else if (action == "FOLLOWERS") {
        await updateDoc(UpdatedData, { followers: updates });
      
    }
    console.log("updated");
  } catch (error) {
    console.log("error", error);
  }
};

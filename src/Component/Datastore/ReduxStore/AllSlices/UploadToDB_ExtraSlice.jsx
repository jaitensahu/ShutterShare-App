import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { ref } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { setPostObject, setUrl } from "./UploadeImgToDBSlice";
import { onLog } from "firebase/app";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

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

export const UpdateDataInDataBase = async (action, email, updates, notify) => {
  try {
    const UpdatedData = doc(db, "users", email);
    if (action == "POST") {
      let abc = await updateDoc(UpdatedData, { posts: updates });
      notify("Uploaded Successfully");
    } else if (action == "FOLLOWINGS") {
      await updateDoc(UpdatedData, { followings: updates });
    } else if (action == "FOLLOWERS") {
      await updateDoc(UpdatedData, { followers: updates });
    } else if (action == "LIKEDPOST") {
      await updateDoc(UpdatedData, { likedPost: updates });
    } else if (action == "ALLPOSTS") {
      console.log("in extra");
      const likesRef = doc(db, "allPosts", email);
      const likeSnap = await getDoc(likesRef);
      if (likeSnap.exists()) {
        console.log(updates.isLiked);
        updates.isLiked
          ? await updateDoc(likesRef, {
              likeBy: arrayRemove(updates.userName),
            })
          : await updateDoc(likesRef, {
              likeBy: arrayUnion(updates.userName),
            });
      } else {
        console.log("No such document!");
        await setDoc(doc(db, `allPosts/${email}`), {
          comments: [],
          id: email,
          likeBy: [updates.userName],
        });
        console.log("New document set!");
        // return null;
      }
    } else if (action == "UPDATELIKES") {
      const likesRef = doc(db, "allPosts", email);
      updates.isLiked
        ? await updateDoc(likesRef, {
            likeBy: arrayRemove(updates.userName),
          })
        : await updateDoc(likesRef, {
            likeBy: arrayUnion(updates.userName),
          });

    
    } else if (action == "COMMENT") {
      const commentRef = doc(db, "allPosts", email);
      const commentSnap = await getDoc(commentRef);

      if (commentSnap.exists()) {
          await updateDoc(commentRef, {
            comments: arrayUnion(updates),
          });
      } else {
         await setDoc(doc(db, `allPosts/${email}`), {
           comments: [updates],
           id: email,
           likeBy: [],
         });
       }
        
      
    }
  } catch (error) {
    console.log("error", error);
    notify("Something Went Wrong..." + error);
  }
};

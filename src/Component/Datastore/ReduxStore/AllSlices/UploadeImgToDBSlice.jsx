import { createSlice } from "@reduxjs/toolkit";
import { ref } from "firebase/database";
import { getDownloadURL, uploadBytes } from "firebase/storage";
const initialState = {
  ProfileImgUrlFromDb: "adasd",
  currentUserProfileImage: "",
  postImageUrl: null,
  postObject:{},
};
export const UploadImgToDBSlice = createSlice({
  name: "UploadImgToDBSlice",
  initialState,
  reducers: {
    setUrl: (state, action) => {
      state.ProfileImgUrlFromDb = action.payload;
    },
    setProfileImage: (state, action) => {
      state.currentUserProfileImage = action.payload;
    },
    setPostImgUrl: (state, action) => {
      state.postImageUrl = action.payload;
    },
    setPostObject: (state, action) => {
      state.postObject = action.payload;
    },
  },
});

export const {setPostObject, setUrl, setProfileImage, setPostImgUrl } =
  UploadImgToDBSlice.actions;
export default UploadImgToDBSlice.reducer;

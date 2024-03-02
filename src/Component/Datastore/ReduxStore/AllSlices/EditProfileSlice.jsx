import { createSlice } from "@reduxjs/toolkit";
import { ref } from "firebase/database";
import { getDownloadURL, uploadBytes } from "firebase/storage";
const initialState = {
  imgUrl: "",
  currentUserProfileImage: "",
};
export const EditProfileSlice = createSlice({
  name: "EditProfileSlice",
  initialState,
  reducers: {
    setUrl: (state, action) => {
      state.imgUrl = action.payload;
    },
    setProfileImage: (state, action) => {
      //   console.log(action.payload);
      state.currentUserProfileImage = action.payload;
    },
  },
});

export const { setUrl, setProfileImage } = EditProfileSlice.actions;
export default EditProfileSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
  openModal2: false,
  imageToPost: null,
  openDiscardModal: false,
  openPicker: false,
  postDescription: "",
  showPostModal: false,
  showPost: null,
  likedArray: [],
};

export const PopUpModalSlice = createSlice({
  name: "PupUpModalSlice",
  initialState,
  reducers: {
    setOpenModal: (state, action) => {
      state.openModal = action.payload;
    },
    setOpenModal2: (state, action) => {
      state.openModal2 = action.payload;
    },
    setDiscardModal: (state, action) => {
      state.openDiscardModal = action.payload;
    },
    setImagetoPost: (state, action) => {
      state.imageToPost = action.payload;
    },
    setEmojiPicker: (state, action) => {
      state.openPicker = action.payload;
    },
    setDescription: (state, action) => {
      state.postDescription = action.payload;
    },
    setShowPostModal: (state, action) => {
      state.showPostModal = action.payload;
    },
    setShowPost: (state, action) => {
      state.showPost = action.payload;
    },
    setLikedArray: (state, action) => {
      state.likedArray = action.payload;
    }
  },
});

export const {
  setOpenModal,
  setImagetoPost,
  setOpenModal2,
  setDiscardModal,
  setEmojiPicker,
  setDescription,
  setShowPostModal,
  setShowPost,
  setLikedArray,
} = PopUpModalSlice.actions;

export default PopUpModalSlice.reducer;

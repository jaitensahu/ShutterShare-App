import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  otherUser: null,
  isFollow: false,
  isAddingInFollower: false,
};

const EditProfileSlice = createSlice({
  name: "EditProfileSlice",
  initialState,
  reducers: {
    setOtherUser: (state, action) => {
      state.otherUser = action.payload;
    },
    setIsFollow: (state, action) => {
      state.isFollow = action.payload;
    },
    setisAddingInFollower: (state, action) => {
      state.isAddingInFollower = action.payload;
    },
  },
});

export const { setOtherUser, setIsFollow, setisAddingInFollower } =
  EditProfileSlice.actions;
export default EditProfileSlice.reducer;

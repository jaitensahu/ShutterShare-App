import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: 0,
};
export const EditProfileSlice = createSlice({
  name: "EditProfileSlice",
  initialState,
  reducers: {
    increament: (action, payload) => {
      console.log(action, payload);
    },
  },
});

export const { increament } = EditProfileSlice.actions;
export default EditProfileSlice.reducer;

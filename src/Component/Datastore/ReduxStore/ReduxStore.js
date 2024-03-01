import { configureStore } from "@reduxjs/toolkit";
import EditProfileSlice from "./AllSlices/EditProfileSlice";

export default configureStore({
  reducer: {
    EditProfileSlice,
  },
});

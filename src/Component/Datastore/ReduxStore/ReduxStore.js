import { configureStore } from "@reduxjs/toolkit";
import UploadImgToDBSlice from "./AllSlices/UploadeImgToDBSlice";
import PopUpModalSlice from "./AllSlices/PopUpModalSlice";
import DashboardSlice from "./AllSlices/DashboardSlice";
import EditProfileSlice from "./AllSlices/EditProfileSlice";
export default configureStore({
  reducer: {
    UploadImgToDBSlice,
    PopUpModalSlice,
    DashboardSlice,
    EditProfileSlice,
  },
});
    
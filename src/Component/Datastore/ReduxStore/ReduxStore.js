import { configureStore } from "@reduxjs/toolkit";
import UploadImgToDBSlice from "./AllSlices/UploadeImgToDBSlice";
import PopUpModalSlice from "./AllSlices/PopUpModalSlice";
export default configureStore({
  reducer: {
    UploadImgToDBSlice,
    PopUpModalSlice,
  },
});
    
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchBarInp: "",
  filteredData: [],
  allFeedPosts: [],
  allLikedPosts: [],
  currentLikeCount: null,
  userPostData: [],
  userData: [],
  isLiked: false,
};
const DashboardSlice = createSlice({
  name: "DashboardSlice",
  initialState,
  reducers: {
    setSearchBarInp: (state, action) => {
      state.searchBarInp = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    setAllFeedPost: (state, action) => {
      console.log(action);
      state.allFeedPosts = action.payload;
    },
    setAllLikedPost: (state, action) => {
      state.allLikedPosts = action.payload;
    },
    setCurrentLikeCount: (state, action) => {
      state.currentLikeCount = action.payload;
    },
    setUserPostData: (state, action) => {
      // console.log(action.payload);
      state.userPostData = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setLiked: (state, action) => {
      state.isLiked = action.payload;
    }
  },
});

function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function functionHandleInput(dispatch, userData, searchBarInp) {
  const filteredData = userData.filter((ele) => {
    return ele.userName.includes(searchBarInp);
  });
  if (searchBarInp != "") {
    dispatch(setFilteredData(filteredData));
  } else {
    dispatch(setFilteredData([]));
  }
}

export const debouncedHandleInput = debounce(functionHandleInput, 800);

export const {
  setSearchBarInp,
  setUserPostData,
  setCurrentLikeCount,
  setAllLikedPost,
  setFilteredData,
  setAllFeedPost,
  setUserData,
  setLiked,
} = DashboardSlice.actions;
export default DashboardSlice.reducer;

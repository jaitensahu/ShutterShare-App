import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchBarInp: "",
  filteredData:[],
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

export const { setSearchBarInp, setFilteredData } = DashboardSlice.actions;
export default DashboardSlice.reducer;

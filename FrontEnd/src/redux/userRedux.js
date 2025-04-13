import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null, // ✅ Load user from localStorage
  isFetching: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
      localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ Save to localStorage
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logOut: (state) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = null;
      localStorage.removeItem("user"); // ✅ Remove from localStorage on logout
    },
  },
});

export const { loginFailure, loginStart, logOut, loginSuccess } = userSlice.actions;
export default userSlice.reducer;

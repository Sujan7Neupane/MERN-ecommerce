// store/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Try to load from localStorage, but also verify with server
const initialState = {
  isLoggedIn: false,
  user: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      // Optional: store in localStorage for persistence
      localStorage.setItem("adminState", JSON.stringify(state));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      // Clear localStorage
      localStorage.removeItem("adminState");
    },
    setAuthState: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },
  },
});

export const { login, logout, setAuthState } = adminSlice.actions;
export default adminSlice.reducer;

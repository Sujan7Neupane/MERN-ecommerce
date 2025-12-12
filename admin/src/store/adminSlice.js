import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  currency: "$",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = adminSlice.actions;
export default adminSlice.reducer;

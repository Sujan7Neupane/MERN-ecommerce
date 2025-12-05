import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || "",
};

const adminSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, logout } = adminSlice.actions;

export default adminSlice.reducer;

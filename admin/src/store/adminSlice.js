import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminToken: localStorage.getItem("adminToken") || "",
  currency: "$",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.adminToken = action.payload; // Update correct state property
      localStorage.setItem("adminToken", action.payload); // Save token properly
    },
    logout: (state) => {
      state.adminToken = ""; // Clear correct state property
      localStorage.removeItem("adminToken");
    },
  },
});

export const { setToken, logout } = adminSlice.actions;

export default adminSlice.reducer;

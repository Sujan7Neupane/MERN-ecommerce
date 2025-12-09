import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // backend will populate this on reload
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user || action.payload;
      state.token = action.payload.accessToken || "";
    },
    logout: (state) => {
      state.user = null;
      state.token = "";
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

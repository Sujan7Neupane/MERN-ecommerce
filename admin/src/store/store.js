import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../store/adminSlice.js";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});

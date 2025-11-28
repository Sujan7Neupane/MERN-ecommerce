import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../store/productSlice.js";

export const store = configureStore({
  reducer: {
    store: productReducer,
  },
});

export default store;

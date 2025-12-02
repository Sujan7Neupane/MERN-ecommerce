import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../store/productSlice.js";
import cartReducer from "../store/cartSlice.js";

export const store = configureStore({
  reducer: {
    store: productReducer,
    cart: cartReducer,
  },
});

export default store;

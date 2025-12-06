import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../store/productSlice.js";
import cartReducer from "../store/cartSlice.js";
import authReducer from "../store/authSlice.js";

export const store = configureStore({
  reducer: {
    store: productReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;

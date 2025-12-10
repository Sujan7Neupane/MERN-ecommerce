import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: {}, // { productId: { size: quantity } }
  cartData: [], // full backend cart items
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add single item to cart (increment quantity if exists)
    addToCart: (state, action) => {
      const { productId, size } = action.payload;

      if (!state.cartItems[productId]) state.cartItems[productId] = {};
      if (!state.cartItems[productId][size])
        state.cartItems[productId][size] = 0;

      state.cartItems[productId][size] += 1;
    },

    // Update quantity of a specific size of a product
    updateQuantity: (state, action) => {
      const { productId, size, quantity } = action.payload;
      if (!state.cartItems[productId]) return;

      if (quantity <= 0) {
        delete state.cartItems[productId][size];
      } else {
        state.cartItems[productId][size] = quantity;
      }

      if (Object.keys(state.cartItems[productId]).length === 0) {
        delete state.cartItems[productId];
      }
    },

    // Remove a specific size of a product completely
    removeItemCompletely: (state, action) => {
      const { productId, size } = action.payload;
      if (!state.cartItems[productId]) return;

      delete state.cartItems[productId][size];

      if (Object.keys(state.cartItems[productId]).length === 0) {
        delete state.cartItems[productId];
      }
    },

    // Set cart data received from backend
    setBackendCart: (state, action) => {
      const backendCart = action.payload;

      state.cartData = backendCart;

      const formatted = {};
      backendCart.forEach((item) => {
        const { productId, size, quantity } = item;
        if (!formatted[productId]) formatted[productId] = {};
        formatted[productId][size] = quantity;
      });

      state.cartItems = formatted;
    },

    // Set cartData directly (without updating cartItems)
    setCart: (state, action) => {
      state.cartData = action.payload;
    },

    // Clear the cart completely
    clearCart: (state) => {
      state.cartData = [];
      state.cartItems = {};
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeItemCompletely,
  setCart,
  clearCart,
  setBackendCart,
} = cartSlice.actions;

export default cartSlice.reducer;

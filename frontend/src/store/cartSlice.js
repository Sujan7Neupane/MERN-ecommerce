import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const { data } = await axios.get("/api/v1/user/cart", {
    withCredentials: true,
  });
  return data.cartData;
});

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

      // 1. Update local cartItems
      if (!state.cartItems[productId]) state.cartItems[productId] = {};

      if (quantity <= 0) {
        delete state.cartItems[productId][size];
      } else {
        state.cartItems[productId][size] = quantity;
      }

      if (Object.keys(state.cartItems[productId]).length === 0) {
        delete state.cartItems[productId];
      }

      // 2. Sync backend-style cartData array
      state.cartData = state.cartData
        .map((item) => {
          if (item.productId._id === productId && item.size === size) {
            return { ...item, quantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    },

    // Remove a specific size of a product completely
    removeItemCompletely: (state, action) => {
      const { productId, size } = action.payload;
      if (!state.cartItems[productId]) return;

      delete state.cartItems[productId][size];

      if (Object.keys(state.cartItems[productId]).length === 0) {
        delete state.cartItems[productId];
      }

      // Also remove from cartData
      state.cartData = state.cartData.filter(
        (item) => !(item.productId?._id === productId && item.size === size)
      );
    },

    // Set cart data received from backend
    setBackendCart: (state, action) => {
      const backendCart = Array.isArray(action.payload) ? action.payload : [];

      state.cartData = backendCart;

      const formatted = {};
      backendCart.forEach((item) => {
        const productId = item.productId?._id || item.productId;
        const { size, quantity } = item;
        if (!productId) return;
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

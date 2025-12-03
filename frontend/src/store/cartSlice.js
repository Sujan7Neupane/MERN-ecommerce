// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cartItems: [],
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const { product, size } = action.payload;

//       const existingItem = state.cartItems.find(
//         (item) => item._id === product._id && item.size === size
//       );

//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.cartItems.push({
//           ...product,
//           size,
//           quantity: 1,
//         });
//       }
//     },

//     // To remove items from cart
//     removeFromCart: (state, action) => {
//       const id = action.payload;
//       state.cartItems = state.cartItems.filter((item) => item._id !== id);
//     },
//   },
// });

// export const { addToCart, removeFromCart } = cartSlice.actions;
// export default cartSlice.reducer;

// Above gives the whole products details like name title ...

// We just want id and sizes
// like {6a5sd1c7asdc5asd6c:{S:1, M:2}}  like this

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: {}, // { productId: { size: quantity } }

  // total price of the product
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, size } = action.payload;

      if (!size) {
        toast.error("Please Select size");
        return;
      }

      // checking existing items in cart
      if (!state.cartItems[productId]) {
        // cart ma item xaina vane initialize empty
        state.cartItems[productId] = {};
      }

      // if size chaina vane create size and quantity = +1 +2
      if (!state.cartItems[productId][size]) {
        state.cartItems[productId][size] = 1;
      } else {
        // if item already exists then +1 +2 on quantity
        state.cartItems[productId][size] += 1;
      }
    },

    // TO update the cart items on changing the quantity input
    // On changing the input changes the cart items number

    updateQuantity: (state, action) => {
      const { productId, size, quantity } = action.payload;

      // If the product does not exist, nothing to update
      if (!state.cartItems[productId]) return;

      // If size does not exist, do nothing
      if (!state.cartItems[productId][size]) return;

      // Otherwise just update the quantity
      state.cartItems[productId][size] = quantity;
    },

    // this removes items quantity
    removeFromCart: (state, action) => {
      const { productId, size } = action.payload;

      // checking items in cart
      if (state.cartItems[productId] && state.cartItems[productId][size]) {
        state.cartItems[productId][size] -= 1;

        // remove size if quantity is 0
        if (state.cartItems[productId][size] <= 0) {
          delete state.cartItems[productId][size];
        }

        // remove productId if no sizes left
        if (Object.keys(state.cartItems[productId]).length === 0) {
          delete state.cartItems[productId];
        }
      }
    },

    // removes the entire items like 3 cha vane each choti items click garna parena jun mathiko ma parthyo
    removeItemCompletely: (state, action) => {
      const { productId, size } = action.payload;

      if (state.cartItems[productId]) {
        delete state.cartItems[productId][size];

        if (Object.keys(state.cartItems[productId]).length === 0) {
          delete state.cartItems[productId];
        }
      }
    },

    // to calculate the final price of product
    calculateTotalAmount: (state, action) => {
      const products = action.payload.products;
      let total = 0;

      for (const productId in state.cartItems) {
        const product = products.find((p) => p._id === productId);
        if (!product) continue;

        const sizes = state.cartItems[productId];
        for (const size in sizes) {
          total += product.price * sizes[size];
        }
      }

      state.totalAmount = total;
    },

    // empty whole cart
    clearCart: (state) => {
      state.cartItems = {};
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  removeItemCompletely,
  updateQuantity,
  calculateTotalAmount,
} = cartSlice.actions;
export default cartSlice.reducer;

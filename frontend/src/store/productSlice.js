import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  currency: "$",
  delivery_fee: 10,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setProducts: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { setError, setLoading, setProducts } = productSlice.actions;

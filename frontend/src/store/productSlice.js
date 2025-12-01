import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  currency: "$",
  delivery_fee: 10,
  loading: false,
  error: null,

  // global variable for searchbar
  search: "",
  showSearch: true,
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
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setShowSearch: (state, action) => {
      state.showSearch = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { setError, setLoading, setProducts, setSearch, setShowSearch } =
  productSlice.actions;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "getProducts",
  async (filters = {}, { getState }) => {
    const state = getState();
    const { category, query, price, page } = state.products.filters;
    const response = await axios.get("http://localhost:8000/products", {
      params: {
        page: filters.page || page,
        price: filters.price || price,
        query: filters.query || query,
        category: filters.category || category,
      },
    });

    return response.data;
  }
);

const apiSlice = createSlice({
  name: "Products",
  initialState: {
    products: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      query: "",
      price: "",
      page: 1,
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilter } = apiSlice.actions;

export default apiSlice.reducer;

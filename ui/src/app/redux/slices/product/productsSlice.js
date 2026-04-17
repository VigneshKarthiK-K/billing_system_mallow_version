import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api_host } from "../../../constants";

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch(`${api_host}/product/get/`);
    const data = await response.json();
    return data.products;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    // increment: (state)=> {state.value += 1},
    // decrement: (state)=> {state.value -= 1},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch products";
      });
  }
})

// export const { increment, decrement } = productsSlice.actions;
export default productsSlice;
import { configureStore } from '@reduxjs/toolkit'
import { billSlice, productsSlice } from './slices';

export default configureStore({
  reducer: {
    products: productsSlice.reducer,
    bill: billSlice.reducer
  }
});

// store.js
import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from '../store/invoiceSlice'; // Adjust the path if needed

const store = configureStore({
  reducer: {
    invoice: invoiceReducer,  // Add invoice reducer to store
  },
});

export default store;

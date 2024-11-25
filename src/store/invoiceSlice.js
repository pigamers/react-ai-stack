// src/store/invoiceSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  invoices: [],
  products: [],
  customers: [],
};

// Create a slice
const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      state.invoices.push(action.payload);
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },
  },
});

// Export the actions to use in components
export const { addInvoice, addProduct, addCustomer } = invoiceSlice.actions;

// Export the reducer to be used in store
export default invoiceSlice.reducer;

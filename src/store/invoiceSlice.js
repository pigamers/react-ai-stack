// invoiceSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoices: [],
  products: [],
  customers: [],
};

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

export const { addInvoice, addProduct, addCustomer } = invoiceSlice.actions;

export default invoiceSlice.reducer; // Default export of the reducer

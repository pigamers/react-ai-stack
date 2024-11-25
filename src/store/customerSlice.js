import { createSlice } from '@reduxjs/toolkit';

export const customerSlice = createSlice({
  name: 'customers',
  initialState: [],
  reducers: {
    setCustomers: (state, action) => {
      return action.payload;
    },
    addCustomer: (state, action) => {
      state.push(action.payload);
    },
    removeCustomer: (state, action) => {
      return state.filter(customer => customer.id !== action.payload);
    },
  },
});

export const { setCustomers, addCustomer, removeCustomer } = customerSlice.actions;

export default customerSlice.reducer;

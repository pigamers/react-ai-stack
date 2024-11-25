import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    removeProduct: (state, action) => {
      return state.filter(product => product.id !== action.payload);
    },
  },
});

export const { setProducts, addProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;

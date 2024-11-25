import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../store/productSlice';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const handleAddProduct = () => {
    const newProduct = { id: Date.now(), name: 'Product A', price: 50 };
    dispatch(addProduct(newProduct));
  };

  return (
    <div>
      <h2>Products</h2>
      <button onClick={handleAddProduct}>Add Product</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{`Product Name: ${product.name}, Price: $${product.price}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Products;

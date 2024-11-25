import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer } from '../store/customerSlice';

const Customers = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers);

  const handleAddCustomer = () => {
    const newCustomer = { id: Date.now(), name: 'John Doe', email: 'john@example.com' };
    dispatch(addCustomer(newCustomer));
  };

  return (
    <div>
      <h2>Customers</h2>
      <button onClick={handleAddCustomer}>Add Customer</button>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>{`Customer: ${customer.name}, Email: ${customer.email}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Customers;

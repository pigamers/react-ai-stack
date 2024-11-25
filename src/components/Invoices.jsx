import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInvoice } from '../store/invoiceSlice';

const Invoices = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices);

  const handleAddInvoice = () => {
    const newInvoice = { id: Date.now(), date: '2024-11-25', amount: 100 };
    dispatch(addInvoice(newInvoice));
  };

  return (
    <div>
      <h2>Invoices</h2>
      <button onClick={handleAddInvoice}>Add Invoice</button>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>{`Invoice ID: ${invoice.id}, Date: ${invoice.date}, Amount: $${invoice.amount}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Invoices;

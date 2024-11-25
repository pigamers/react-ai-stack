import React from 'react';
import { useSelector } from 'react-redux';

const CustomersTab = () => {
  const customers = useSelector((state) => state.invoice.customers);

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6 mb-8">
      <table className="min-w-full table-auto">
        <thead className="bg-yellow-500 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Customer Name</th>
            <th className="px-6 py-4 text-left">Customer Company Name</th>
            <th className="px-6 py-4 text-left">Customer Phone Number</th>
            <th className="px-6 py-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customers, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="px-6 py-4">{customers.customerName || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{customers.customerCompanyName || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{customers.customerPhoneNumber || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{customers.customerStatus || <span className="text-red-500">Missing</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersTab;

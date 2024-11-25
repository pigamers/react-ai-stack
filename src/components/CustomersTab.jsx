import React from 'react';

const CustomersTab = ({ data }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6 mb-8">
      <table className="min-w-full table-auto">
        <thead className="bg-yellow-500 text-white">
          <tr>
            <th className="px-4 py-2">Customer Name</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Total Purchase Amount</th>
          </tr>
        </thead>
        <tbody>
          {data?.customers?.map((customer, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{customer.name || <span className="text-red-500">Missing</span>}</td>
              <td className="px-4 py-2">{customer.phone || <span className="text-red-500">Missing</span>}</td>
              <td className="px-4 py-2">{customer.totalPurchase || <span className="text-red-500">Missing</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersTab;

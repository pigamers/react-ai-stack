import React from 'react';

const InvoicesTab = ({ data }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6 mb-8">
      <table className="min-w-full table-auto">
        <thead className="bg-yellow-500 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Serial Number</th>
            <th className="px-6 py-4 text-left">Customer Name</th>
            <th className="px-6 py-4 text-left">Product Name</th>
            <th className="px-6 py-4 text-left">Qty</th>
            <th className="px-6 py-4 text-left">Tax</th>
            <th className="px-6 py-4 text-left">Total Amount</th>
            <th className="px-6 py-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.invoices?.map((invoice, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="px-6 py-4">{invoice.serialNumber || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{invoice.customerName || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{invoice.productName || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{invoice.qty || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{invoice.tax || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{invoice.total || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{invoice.date || <span className="text-red-500">Missing</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesTab;

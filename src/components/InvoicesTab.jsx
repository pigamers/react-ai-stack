import React from 'react';
import { useSelector } from 'react-redux';

const InvoicesTab = () => {
  const invoices = useSelector((state) => state.invoice.invoices);
  // console.log(invoices);

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6 mb-8">
      <table className="min-w-full table-auto">
        <thead className="bg-yellow-500 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Serial Number</th>
            <th className="px-6 py-4 text-left">Invoice Date</th>
            <th className="px-6 py-4 text-left">Item Total Amount in Rs.</th>
            <th className="px-6 py-4 text-left">Net Amount in Rs.</th>
            <th className="px-6 py-4 text-left">Tax Amount in Rs.</th>
            <th className="px-6 py-4 text-left">Pending Amount in Rs.</th>
            <th className="px-6 py-4 text-left">Total Amount in Rs.</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="px-6 py-4">{invoice.serialNumber || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{invoice.invoiceDate || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{invoice.itemTotalAmount || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{invoice.netAmount || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{invoice.taxAmount || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{invoice.pendingAmount || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{invoice.totalAmount || <span className="text-red-500">Missing</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesTab;

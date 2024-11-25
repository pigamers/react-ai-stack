import React from 'react';

const ProductsTab = ({ data }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6 mb-8">
      <table className="min-w-full table-auto">
        <thead className="bg-yellow-500 text-white">
          <tr>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Unit Price</th>
            <th className="px-4 py-2">Tax</th>
            <th className="px-4 py-2">Price with Tax</th>
            <th className="px-4 py-2">Discount</th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((product, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{product.name || <span className="text-red-500">Missing</span>}</td>
              <td className="px-4 py-2">{product.quantity || <span className="text-red-500">Missing</span>}</td>
              <td className="px-4 py-2">{product.unitPrice || <span className="text-red-500">Missing</span>}</td>
              <td className="px-4 py-2">{product.tax || <span className="text-red-500">Missing</span>}</td>
              <td className="px-4 py-2">{product.priceWithTax || <span className="text-red-500">Missing</span>}</td>
              <td className="px-4 py-2">{product.discount || <span className="text-red-500">Missing</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTab;

import React from 'react';
import { useSelector } from 'react-redux';

const ProductsTab = () => {
  const products = useSelector((state) => state.invoice.products);

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6 mb-8">
      <table className="min-w-full table-auto">
        <thead className="bg-yellow-500 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Product Name</th>
            <th className="px-6 py-4 text-left">Price with Tax</th>
            <th className="px-6 py-4 text-left">Quantity</th>
            <th className="px-6 py-4 text-left">Unit</th>
            <th className="px-6 py-4 text-left">Unit Price</th>
            <th className="px-6 py-4 text-left">Unit Price After Discount</th>
            <th className="px-6 py-4 text-left">Price with Tax After Discount</th>
            <th className="px-6 py-4 text-left">Tax percent</th>
            <th className="px-6 py-4 text-left">Item Discount</th>
          </tr>
        </thead>
        <tbody>
          {products.map((products, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="px-6 py-4">{products.name || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{products.priceWithTax || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{products.quantity || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{products.unit || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{products.unitPrice || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{products.unitPriceAfterDiscount || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{products.pricewithTaxAfterDiscount || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{products.tax || <span className="text-red-500">Missing</span>}</td>
              <td className="px-6 py-4">{products.itemDiscount || <span className="text-red-500">Missing</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTab;

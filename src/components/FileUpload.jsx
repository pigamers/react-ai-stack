import React, { useState } from 'react';

const FileUpload = ({ onDataExtracted }) => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    // Mock AI data extraction
    const extractedData = extractData(uploadedFile);
    onDataExtracted(extractedData);
  };

  // Mock AI data extraction
  const extractData = (file) => {
    // Mock data: Normally, this would be done via AI model/algorithm or API
    if (file.type === 'application/pdf') {
      return {
        invoices: [
          {
            serialNumber: 'INV001',
            customerName: 'John Doe',
            productName: 'Laptop',
            qty: 1,
            tax: 20,
            total: 1200,
            date: '2024-11-20',
          },
        ],
        products: [
          {
            name: 'Laptop',
            quantity: 10,
            unitPrice: 1000,
            tax: 20,
            priceWithTax: 1200,
          },
        ],
        customers: [
          {
            name: 'John Doe',
            phone: '123-456-7890',
            totalPurchase: 1200,
          },
        ],
      };
    }
    if (file.type === 'application/vnd.ms-excel') {
      return {
        invoices: [
          {
            serialNumber: 'INV002',
            customerName: 'Jane Smith',
            productName: 'Phone',
            qty: 2,
            tax: 10,
            total: 800,
            date: '2024-11-22',
          },
        ],
        products: [
          {
            name: 'Phone',
            quantity: 5,
            unitPrice: 500,
            tax: 10,
            priceWithTax: 550,
          },
        ],
        customers: [
          {
            name: 'Jane Smith',
            phone: '098-765-4321',
            totalPurchase: 800,
          },
        ],
      };
    }
    return { invoices: [], products: [], customers: [] }; // Empty result for unsupported file
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 w-96">
      <h2 className="text-xl font-semibold mb-4 text-center">Upload Your Invoice Files</h2>
      <input
        type="file"
        onChange={handleFileUpload}
        className="block w-full text-gray-800 text-lg border border-gray-300 rounded-md py-2 px-4 mb-4"
      />
      {file && (
        <div className="text-center">
          <p className="text-sm text-gray-600">Uploaded File: {file.name}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

import React, { useState } from 'react';
import InvoicesTab from './components/InvoicesTab';
import ProductsTab from './components/ProductsTab';
import CustomersTab from './components/CustomersTab';
import FileUpload from './components/FileUpload';

function App() {
  const [data, setData] = useState({ invoices: [], products: [], customers: [] });
  const [activeTab, setActiveTab] = useState('invoices');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDataExtracted = (extractedData) => {
    setData(extractedData);
  };

  const handleFileUpload = async (file) => {
    setIsProcessing(true);
    await processFile(file, dispatch); // Assuming this function triggers your data extraction logic
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex flex-col items-center py-8 px-4">
      {/* Header Section */}
      <header className="text-center text-white mb-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Invoice Management</h1>
        <p className="text-lg mb-6">AI-Powered Data Extraction and Organization</p>
      </header>

      {/* File Upload */}
      <FileUpload onDataExtracted={handleDataExtracted} />

      {/* Loading State */}
      {isProcessing && (
        <div className="text-center py-4">Processing data, please wait...</div>
      )}

      {/* Tab Buttons */}
      <div className="flex justify-center space-x-6 mb-12">
        <button
          onClick={() => handleTabChange('invoices')}
          className={`py-3 px-8 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out transform ${activeTab === 'invoices' ? 'bg-yellow-500 text-white' : 'bg-white text-yellow-500 border-2 border-yellow-500'} hover:bg-yellow-600 hover:text-white hover:scale-105`}
        >
          Invoices
        </button>
        <button
          onClick={() => handleTabChange('products')}
          className={`py-3 px-8 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out transform ${activeTab === 'products' ? 'bg-yellow-500 text-white' : 'bg-white text-yellow-500 border-2 border-yellow-500'} hover:bg-yellow-600 hover:text-white hover:scale-105`}
        >
          Products
        </button>
        <button
          onClick={() => handleTabChange('customers')}
          className={`py-3 px-8 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out transform ${activeTab === 'customers' ? 'bg-yellow-500 text-white' : 'bg-white text-yellow-500 border-2 border-yellow-500'} hover:bg-yellow-600 hover:text-white hover:scale-105`}
        >
          Customers
        </button>
      </div>

      {/* Data Display Section */}
      <div className="w-full mx-auto">
        {/* Invoices Tab */}
        {activeTab === 'invoices' && <InvoicesTab invoices={data.invoices} />}
        {/* Products Tab */}
        {activeTab === 'products' && <ProductsTab products={data.products} />}
        {/* Customers Tab */}
        {activeTab === 'customers' && <CustomersTab customers={data.customers} />}
      </div>
    </div>
  );
}

export default App;

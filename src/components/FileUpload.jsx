import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { processFile } from '../utils/fileProcessor';

const FileUpload = ({ onDataExtracted }) => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch(); // Initialize dispatch function for Redux

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    if (uploadedFile) {
      // Call the processFile function to handle different file types
      processFile(uploadedFile, dispatch);
    }
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

import * as XLSX from 'xlsx';
import Tesseract from 'tesseract.js';
import { addInvoice, addProduct, addCustomer } from '../store/invoiceSlice';

// Function to process Excel files
export const processExcel = (file, dispatch) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: 'binary' });
    
    // Assume first sheet contains the transaction data
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);

    json.forEach((row) => {
      const invoice = {
        id: Date.now(),
        serialNumber: row['Serial Number'],
        netAmount: row['Net Amount'],
        totalAmount: row['Total Amount'],
        customerName: row['Customer Name'],
      };

      const product = {
        id: Date.now(),
        name: row['Product Name'],
        price: row['Price'],
        quantity: row['Quantity'],
      };

      const customer = {
        id: Date.now(),
        name: row['Customer Name'],
        email: row['Email'],
      };

      dispatch(addInvoice(invoice));
      dispatch(addProduct(product));
      dispatch(addCustomer(customer));
    });
  };
  reader.readAsBinaryString(file);
};

// Function to process PDF/Images using Tesseract.js
export const processPdfOrImage = (file, dispatch) => {
  Tesseract.recognize(
    file,
    'eng',
    {
      logger: (m) => console.log(m),
    }
  ).then(({ data: { text } }) => {
    console.log('OCR Result: ', text);
    
    // Example logic to organize extracted text (you will need to customize this)
    const extractedData = extractInvoiceDataFromText(text);

    extractedData.forEach((data) => {
      const invoice = {
        id: Date.now(),
        serialNumber: data.serialNumber,
        netAmount: data.netAmount,
        totalAmount: data.totalAmount,
        customerName: data.customerName,
      };

      const product = {
        id: Date.now(),
        name: data.productName,
        price: data.productPrice,
        quantity: data.productQuantity,
      };

      const customer = {
        id: Date.now(),
        name: data.customerName,
        email: data.customerEmail,
      };

      dispatch(addInvoice(invoice));
      dispatch(addProduct(product));
      dispatch(addCustomer(customer));
    });
  });
};

// A placeholder function to extract structured data from OCR result (needs to be customized)
const extractInvoiceDataFromText = (text) => {
  const data = [];
  const regex = /Invoice ID: (\d+).*?Amount: \$(\d+\.\d+).*?Customer: (\w+).*?Product: (\w+).*?Price: \$(\d+\.\d+)/gs;
  let match;
  while ((match = regex.exec(text)) !== null) {
    data.push({
      serialNumber: match[1],
      netAmount: match[2],
      totalAmount: match[2],
      customerName: match[3],
      productName: match[4],
      productPrice: match[5],
      productQuantity: 1, // Set default quantity for simplicity
      customerEmail: 'example@example.com', // Placeholder email, needs improvement
    });
  }
  return data;
};

// Unified file processing function
export const processFile = (file, dispatch) => {
  const fileType = file.type;

  if (fileType.includes('excel') || fileType.includes('spreadsheet')) {
    processExcel(file, dispatch);
  } else if (fileType.includes('pdf') || fileType.includes('image')) {
    processPdfOrImage(file, dispatch);
  } else {
    alert('Unsupported file type');
  }
};

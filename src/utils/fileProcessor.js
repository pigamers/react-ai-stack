import * as XLSX from 'xlsx';
import { addInvoice, addProduct, addCustomer } from '../store/invoiceSlice';

// Function to process Excel file  
export const processExcel = (file, dispatch) => {
  console.log("Processing Excel file...");
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: 'binary' });

    // Assume the first sheet contains the transaction data
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);

    console.log("Extracted Excel Data.");

    json.forEach((row) => {
      const invoice = {
        id: Date.now(),
        serialNumber: row['Serial Number'],
        invoiceDate: row['Invoice Date'] || row['Date'],
        itemTotalAmount: row['Item Total Amount'],
        netAmount: row['Net Amount'],
        taxAmount: row['Tax Amount'],
        pendingAmount: row['Amount pending'],
        totalAmount: row['Total Amount']
      };

      const product = {
        id: Date.now(),
        name: row['Product Name'],
        priceWithTax: row['Price with Tax'],
        quantity: row['Qty'],
        unit: row['Unit'],
        unitPrice: row['Unit Price'],
        unitPriceAfterDiscount: row['Unit Price After Discount'],
        pricewithTaxAfterDiscount: row['Price with Tax After Discount'],
        tax: row['Tax (%)'],
        itemDiscount: row['Item Discount']
      };

      const customer = {
        id: Date.now(),
        customerName: row['Party Name'] || row['Created By'],
        customerCompanyName: row['Party Company Name'],
        customerPhoneNumber: row['Phone Number'],
        customerStatus: row['Status']
      };

      dispatch(addInvoice(invoice));
      dispatch(addProduct(product));
      dispatch(addCustomer(customer));
    });
  };
  reader.readAsBinaryString(file);
};

// Unified file processing function
export const processFile = (file, dispatch) => {
  const fileType = file.type;

  console.log("Processing file with type:", fileType);

  if (fileType.includes('excel') || fileType.includes('spreadsheet')) {
    processExcel(file, dispatch);
  } else {
    alert('Unsupported file type');
  }
};


import * as XLSX from 'xlsx';
import Tesseract from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist';
import { addInvoice, addProduct, addCustomer } from '../store/invoiceSlice';

// Function to process Excel files
export const processExcel = (file, dispatch) => {
  console.log("Processing Excel file...");
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: 'binary' });

    // Assume the first sheet contains the transaction data
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);

    console.log("Extracted Excel Data:", json);

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

// Function to process PDF/Images using Tesseract.js
export const processPdfOrImage = (file, dispatch) => {
  console.log("Processing file with type:", file.type);

  if (file.type === 'application/pdf') {
    // Ensure PDF.js worker is correctly referenced before loading PDF
    if (!pdfjsLib) {
      console.error('PDF.js library is not loaded');
      return;
    }
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.min.mjs'; // Use a more stable version

    const reader = new FileReader();

    // Read the file as an array buffer
    reader.onload = async (e) => {
      console.log('FileReader loaded the file successfully.');
      try {
        const pdfData = new Uint8Array(e.target.result);
        console.log('PDF Data:', pdfData);

        // Ensure the data is not empty
        if (pdfData.length === 0) {
          console.error('PDF data is empty');
          return;
        }

        // Attempt to load PDF document
        const pdfDoc = await pdfjsLib.getDocument(pdfData).promise;
        console.log('PDF Loaded. Number of pages:', pdfDoc.numPages);

        // Extract each page from the PDF as an image
        const images = [];
        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
          const page = await pdfDoc.getPage(pageNum);
          console.log(`Rendering page ${pageNum}`);

          const viewport = page.getViewport({ scale: 1 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render the page as an image on the canvas
          await page.render({ canvasContext: context, viewport }).promise;

          // Check if the canvas was rendered properly
          console.log(`Canvas rendered for page ${pageNum}`, canvas);

          const imageUrl = canvas.toDataURL();
          images.push(imageUrl);
        }

        console.log("Images extracted from PDF:", images.length);

        // Process the images with Tesseract
        images.forEach((image, index) => {
          console.log(`Processing image ${index + 1} with Tesseract...`);
          Tesseract.recognize(
            image,
            'eng',
            {
              logger: (m) => console.log(m), // Logs Tesseract process
            }
          ).then(({ data: { text } }) => {
            console.log(`OCR Result from page ${index + 1}:`, text);

            // Log the raw text to check for OCR quality
            console.log("Raw OCR Text: ", text);

            console.log("ehlli");

            // Extract the structured data
            const extractedData = extractInvoiceDataFromText(text);
            console.log("Extracted Data:", extractedData);

            // Log the individual invoice, product, and customer details
            extractedData.forEach((data) => {
              const invoice = {
                id: Date.now(),
                serialNumber: data.serialNumber || 'Unknown',
                netAmount: data.netAmount || '0.00',
                totalAmount: data.totalAmount || '0.00',
                customerName: data.customerName || 'Unknown',
              };

              const product = {
                id: Date.now(),
                name: data.productName || 'Unknown Product',
                price: data.productPrice || '0.00',
                quantity: data.productQuantity || 1,
              };

              const customer = {
                id: Date.now(),
                name: data.customerName || 'Unknown',
                email: data.customerEmail || 'example@example.com',
              };

              // Log the objects being created
              console.log("Invoice:", invoice);
              console.log("Product:", product);
              console.log("Customer:", customer);

              dispatch(addInvoice(invoice));
              dispatch(addProduct(product));
              dispatch(addCustomer(customer));
            });
          }).catch((err) => {
            console.error("Tesseract OCR error:", err);
          });
        });
      } catch (error) {
        console.error("Error loading or processing PDF:", error);
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading the file:', error);
    };

    reader.readAsArrayBuffer(file);

  } else {
    // If the file is an image, directly process it using Tesseract
    console.log("Processing image file with Tesseract...");
    Tesseract.recognize(
      file,
      'eng',
      {
        logger: (m) => console.log(m),
      }
    ).then(({ data: { text } }) => {
      console.log('OCR Result: ', text);

      // Log the raw text to check for OCR quality
      console.log("Raw OCR Text: ", text);

      const extractedData = extractInvoiceDataFromText(text);
      console.log("Extracted Data:", extractedData);

      // Log the individual invoice, product, and customer details
      extractedData.forEach((data) => {
        const invoice = {
          id: Date.now(),
          serialNumber: data.serialNumber || 'Unknown',
          netAmount: data.netAmount || '0.00',
          totalAmount: data.totalAmount || '0.00',
          customerName: data.customerName || 'Unknown',
        };

        const product = {
          id: Date.now(),
          name: data.productName || 'Unknown Product',
          price: data.productPrice || '0.00',
          quantity: data.productQuantity || 1,
        };

        const customer = {
          id: Date.now(),
          name: data.customerName || 'Unknown',
          email: data.customerEmail || 'example@example.com',
        };

        // Log the objects being created
        console.log("Invoice:", invoice);
        console.log("Product:", product);
        console.log("Customer:", customer);

        dispatch(addInvoice(invoice));
        dispatch(addProduct(product));
        dispatch(addCustomer(customer));
      });
    }).catch((err) => {
      console.error("Tesseract OCR error:", err);
    });
  }
};




// A placeholder function to extract structured data from OCR result (needs to be customized)
const extractInvoiceDataFromText = (text) => {
  const data = [];
  const regex = /Invoice Date:\s*(.*)\s*Item Total Amount:\s*(.*)\s*Party Company Name:\s*(.*)\s*Party Name:\s*(.*)\s*Phone Number:\s*(.*)\s*Price with Tax:\s*(.*)\s*Product Name:\s*(.*)\s*Qty:\s*(.*)\s*Serial Number:\s*(.*)\s*Status:\s*(.*)\s*Tax\s*\(\%\):\s*(.*)\s*Unit:\s*(.*)/gs;
  let match;

  while ((match = regex.exec(text)) !== null) {
    data.push({
      invoiceDate: match[1] || 'Unknown',
      itemTotalAmount: match[2] || '0.00',
      partyCompanyName: match[3] || 'Unknown',
      partyName: match[4] || 'Unknown',
      phoneNumber: match[5] || 'Unknown',
      priceWithTax: match[6] || '0.00',
      productName: match[7] || 'Unknown Product',
      qty: match[8] || '1',
      serialNumber: match[9] || 'Unknown',
      status: match[10] || 'Unknown',
      tax: match[11] || '0',
      unit: match[12] || 'Unknown',
    });
  }

  return data;
};

// Unified file processing function
export const processFile = (file, dispatch) => {
  const fileType = file.type;

  console.log("Processing file with type:", fileType);

  if (fileType.includes('excel') || fileType.includes('spreadsheet')) {
    processExcel(file, dispatch);
  } else if (fileType.includes('pdf') || fileType.includes('image')) {
    processPdfOrImage(file, dispatch);
  } else {
    alert('Unsupported file type');
  }
};

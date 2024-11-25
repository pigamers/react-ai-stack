# Invoice Management Application

## Description

The Invoice Management Application automates the extraction, processing, and management of invoice data from various file formats. Currently, it supports extracting data from Excel files, organizing it into three main sections: **Invoices**, **Products**, and **Customers**, and synchronizing changes in real-time using Redux for consistent updates across tabs.

## Features

- **Invoice Management**: View and manage invoices, including details such as invoice ID, date, and amount.
- **Product Management**: View and manage products, including product ID, name, and price.
- **Customer Management**: View and manage customer details, including customer ID and name.
- **Excel File Upload**: Upload an Excel file to extract data and update the respective sections.
- **Real-time Synchronization**: Data is synchronized across tabs using Redux for consistent updates.

## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/pigamers/react-ai-stack.git
```

### 2. Install dependencies:
```bash
cd react-ai-stack
npm install
```

### 3. Start the development server:
```bash
npm run dev
```

### 4. Access the application in your browser:
- Open your browser and navigate to http://localhost:5173.

### 5. Usage
- Upload an Excel file using the Upload button.
- The data will be parsed, and the Invoices, Products, and Customers will be displayed in their respective sections.
- Any changes made to the data will be updated in real-time using Redux.

### 6. Screenshots

![Alt text](/src/assets/one.png)

![Alt text](/src/assets/two.png)

![Alt text](/src/assets/three.png)

### 7. Technologies Used
- React
- Redux
- Vite
- XLSX (Excel Parsing)

### 8. Final Step
- Ensure you have `redux`, `@reduxjs/toolkit`, and `xlsx` installed as dependencies.


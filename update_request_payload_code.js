const payload = {};
let columns = [];
let values = [];

// Process the elements on the context panel (assuming context.panel.elements is valid)
context.panel.elements.forEach((element) => {
  console.log('element:', element);
  if (!element.value) {
    return;
  }
  payload[element.id] = element.value; // Add element value to the payload
});

// The getPayload function to process the CSV file
const getPayload = async () => {
  // Assuming the file is uploaded via file input (id="fileInput")
  const file = payload.file && payload.file[0]; // Get the first file selected by the user

  if (!file || file.type !== 'text/csv') {
    throw new Error('Please upload a valid CSV file.');
  }

  // Read the CSV file using FileReader
  const data = await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result; // The CSV content as text
      resolve(fileContent); // Resolve the promise with file content
    };

    reader.onerror = function () {
      reject(new Error('Failed to read the file.'));
    };

    reader.readAsText(file); // Read the file as text
  });

  // Step 1: Split the CSV content into rows
  const rows = data.split('\n').map(row => row.trim()).filter(row => row !== ''); // Clean and filter out empty rows

  // Step 2: Parse the CSV rows into an array of objects
  const headers = rows[0].split(',').map(h => h.trim()); // Assume the first row contains headers
  console.log("Headers:", headers); // Log headers to ensure they are correct

  // Step 3: Process the remaining rows and store the values
  values = rows.slice(1).map(row => {
    const columns = row.split(',').map(col => col.trim().replace(/'/g, "''"));  // Split each row by comma and escape single quotes

    // Map columns to their corresponding header names and return them as an object
    const rowObject = headers.reduce((acc, header, index) => {
      acc[header] = columns[index] || null; // Map each column to the corresponding header
      return acc;
    }, {});

    return rowObject; // Return the row object
  });

  // Step 4: Map columns (headers) for your SQL or other purposes
  columns = headers.join(', '); // Ensure the column names are being handled properly
  console.log("Columns:", columns); // Log columns to ensure they are correctly extracted

  // Step 5: Populate the payload with the columns and values
  payload.columns = columns; // Add columns to the payload
  payload.values = values; // Add processed values to the payload

  // Log the final processed values and columns
  console.log("Processed Values:", values);
  console.log("Payload:", payload);

  // Step 6: Create value strings dynamically for each row in the payload values
  const valueStrings = values.map(row => {
    return `('${row.name}', '${row.product}', '${row.merchantname}', '${row.cardser_no}', '${row.card_ser_no}')`; // Construct the value string for each row
  });

  // Step 7: Join all the value strings with commas
  const insertQuery = `INSERT INTO TRANSACTIONS (${columns}) VALUES ${valueStrings.join(', ')}`;

  // Log the final SQL query
  console.log("Generated SQL Query:", insertQuery);

  // Return the payload and SQL query
  return {
    payload,
    insertQuery
  };
};

// Call getPayload and log the result
return getPayload();

const xlsx = require('xlsx');
const mysql = require('mysql');
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mystage',
};

function insertExcelData(req, callback) {
  // Check if the file was uploaded successfully
  if (!req.file) {
    callback(new Error('No file was uploaded.'));
    return;
  }

  const filePath = req.file.path;

  try {
    // Read the uploaded file
    const workbook = xlsx.readFile(filePath);

    const data = {};

    workbook.SheetNames.forEach((sheetName) => {
      // Get the worksheet
      const worksheet = workbook.Sheets[sheetName];

      // Convert the worksheet to an array of objects
      data[sheetName] = xlsx.utils.sheet_to_json(worksheet, {
        defval: "no value"
      });
    });

    // Insert the data to the database
    const connection = mysql.createConnection(dbConfig);

    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
        callback(new Error('Error connecting to MySQL.'));
        return;
      }

      console.log('Connected to MySQL database!');

      const insertedTables = []; // To store the successfully inserted table names

      for (const tableName in data) {
        const tableData = data[tableName];

        const insertQuery = `INSERT INTO ${tableName} SET ?`;

        tableData.forEach((row) => {
          connection.query(insertQuery, row, (err, result) => {
            if (err) {
              console.error(`Error inserting data into table ${tableName}:`, err);
            } else {
              console.log(`Inserted data into table ${tableName}, Row ID: ${result.insertId}`);
            }
          });
        });

        insertedTables.push(tableName); // Store the table name after successful insertion
      }

      connection.end((err) => {
        if (err) {
          console.error('Error closing the connection:', err);
        } else {
          console.log('Connection to MySQL database closed.');
        }
      });

      // Respond with a success message including inserted table names
      const message = `Data insertion process completed successfully. Inserted tables: ${insertedTables.join(', ')}.`;
      callback(null, message);
    });
  } catch (error) {
    console.error('Error reading the Excel file:', error.message);
    callback(error);
  }
}

module.exports = {
  insertExcelData,
};

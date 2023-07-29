const xlsx = require('xlsx');

function readExcelFile(filePath) {
  try {
    // Read the file
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

    return data;
  } catch (error) {
    console.error('Error reading the Excel file:', error.message);
    return null;
  }
}

module.exports = {
  readExcelFile,
};

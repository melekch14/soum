const express = require('express');
const router = express.Router();
const multer = require('multer');
const excelController = require('../controllers/excelController');

// Middleware to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Route to handle Excel data insertion
router.post('/insert-excel-data', upload.single('excelFile'), (req, res) => {
  excelController.insertExcelData(req, (err, message) => {
    if (err) {
      res.status(500).json({ message: 'Error inserting data into the database.' });
    } else {
      res.json({ message });
    }
  });
});

module.exports = router;

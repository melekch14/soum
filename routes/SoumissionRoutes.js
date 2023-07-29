const express = require('express');
const SoumissionController = require('../controllers/soumissionController');

const router = express.Router();

router.get('/getAll', SoumissionController.getAllSoumissions);
router.get('/getAllByOffre/:id', SoumissionController.getAllSoumissionsByOffre);
router.get('/getById/:id', SoumissionController.getSoumissionById);
router.post('/create', SoumissionController.createSoumission);
router.put('/update/:id', SoumissionController.updateSoumission);
router.delete('/delete/:id', SoumissionController.deleteSoumission);

module.exports = router;

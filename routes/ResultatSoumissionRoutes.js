const express = require('express');
const ResultatSoumissionController = require('../controllers/resultatSoumissionController');

const router = express.Router();

router.get('/getAll', ResultatSoumissionController.getAllResultatsSoumission);
router.get('/getById/:id', ResultatSoumissionController.getResultatSoumissionById);
router.post('/create', ResultatSoumissionController.createResultatSoumission);
router.put('/update/:id', ResultatSoumissionController.updateResultatSoumission);
router.delete('/delete/:id', ResultatSoumissionController.deleteResultatSoumission);

module.exports = router;

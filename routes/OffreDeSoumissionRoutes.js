const express = require('express');
const OffreDeSoumissionController = require('../controllers/offreDeSoumissionController');

const router = express.Router();

router.get('/getAll', OffreDeSoumissionController.getAllOffresDeSoumission);
router.get('/getById/:id', OffreDeSoumissionController.getOffreDeSoumissionById);
router.post('/create', OffreDeSoumissionController.createOffreDeSoumission);
router.put('/update/:id', OffreDeSoumissionController.updateOffreDeSoumission);
router.delete('/delete/:id', OffreDeSoumissionController.deleteOffreDeSoumission);

module.exports = router;

const express = require('express');
const SousOffreController = require('../controllers/sousOffreController');

const router = express.Router();

router.get('/getAll', SousOffreController.getAllSousOffres);
router.get('/getAllByRetrait/:id', SousOffreController.getAllSousOffresByRetrait);
router.get('/getById/:id', SousOffreController.getSousOffreById);
router.post('/create', SousOffreController.createSousOffre);
router.put('/update/:id', SousOffreController.updateSousOffre);
router.delete('/delete/:id', SousOffreController.deleteSousOffre);

module.exports = router;

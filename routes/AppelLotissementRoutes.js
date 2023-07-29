const express = require('express');
const AppelLotissementController = require('../controllers/appelLotissementController');

const router = express.Router();

router.get('/getAll', AppelLotissementController.getAllAppelLotissement);
router.get('/getById/:id', AppelLotissementController.getAppelLotissementById);
router.get('/getByAppel/:id', AppelLotissementController.getAllAppelLotissementByAppel);
router.post('/create', AppelLotissementController.createAppelLotissement);
router.put('/update/:id', AppelLotissementController.updateAppelLotissement);
router.delete('/delete/:id', AppelLotissementController.deleteAppelLotissement);

module.exports = router;

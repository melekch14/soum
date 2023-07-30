const express = require('express');
const LotController = require('../controllers/lotController');

const router = express.Router();

router.get('/getAll', LotController.getAllLots);
router.get('/get-All', LotController.getAllLots2);
router.get('/getById/:id', LotController.getLotById);
router.get('/getByLot/:id', LotController.getLotByLot);
router.get('/getByLotissement/:id', LotController.getLotByLotissement);
router.get('/getByAppel/:id', LotController.getLotByAppel);
router.post('/create', LotController.createLot);
router.put('/update/:id', LotController.updateLot);
router.delete('/delete/:id', LotController.deleteLot);

module.exports = router;

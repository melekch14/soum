// routes/lotissemntRoutes.js
const express = require('express');
const lotissemntController = require('../controllers/lotissemntController');

const router = express.Router();

router.get('/getAll', lotissemntController.getAllLotissemnts);
router.get('/getById/:id', lotissemntController.getLotissemntById);
router.get('/getByRetrait/:id', lotissemntController.getAllLotissemntsByRetrait);
router.post('/create', lotissemntController.createLotissemnt);
router.put('/update/:id', lotissemntController.updateLotissemnt);
router.delete('/delete/:id', lotissemntController.deleteLotissemnt);

module.exports = router;

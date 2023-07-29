const express = require('express');
const vocationController = require('../controllers/vocationController');

const router = express.Router();

router.get('/getAll', vocationController.getAllvocations);
router.get('/getById/:id', vocationController.getVocationById);
router.post('/create', vocationController.createVocation);
router.put('/update/:id', vocationController.updateVocation);
router.delete('/delete/:id', vocationController.deleteVocation);

module.exports = router;

const express = require('express');
const AppelOffreController = require('../controllers/appelOffreController');

const router = express.Router();

router.get('/getAll', AppelOffreController.getAllAppelsOffre);
router.get('/getById/:id', AppelOffreController.getAppelOffreById);
router.post('/create', AppelOffreController.createAppelOffre);
router.put('/update/:id', AppelOffreController.updateAppelOffre);
router.delete('/delete/:id', AppelOffreController.deleteAppelOffre);

module.exports = router;

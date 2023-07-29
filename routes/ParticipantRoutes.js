// routes/ParticipantRoutes.js
const express = require('express');
const ParticipantController = require('../controllers/participantController');

const router = express.Router();

router.get('/getAll', ParticipantController.getAllParticipant);
router.get('/getById/:id', ParticipantController.getParticipantById);
router.post('/create', ParticipantController.createPartcipant);
router.put('/update/:id', ParticipantController.updateParticipant);
router.delete('/delete/:id', ParticipantController.deleteParticipant);

module.exports = router;
const express = require('express');
const ResponsableController = require('../controllers/responsableController');

const router = express.Router();

router.get('/getAll', ResponsableController.getAllResponsables);
router.get('/getById/:id', ResponsableController.getResponsableById);
router.post('/create', ResponsableController.createResponsable);
router.put('/update/:id', ResponsableController.updateResponsable);
router.delete('/delete/:id', ResponsableController.deleteResponsable);

module.exports = router;

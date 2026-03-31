const express = require('express');
const router = express.Router();
const huespedController = require('../controllers/huespedController');

//POST
router.post('/', huespedController.crearHuesped);

//GET
router.get('/:documento', huespedController.consultarHuesped);

module.exports = router;
const express = require('express');
const router = express.Router();
const habitacionController = require('../controllers/habitacionController');

router.get('/tipos', habitacionController.obtenerTiposDisponibles);

router.post('/seleccionar', habitacionController.procesarSeleccionVariacion);

module.exports = router;
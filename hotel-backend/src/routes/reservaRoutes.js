const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.post('/', reservaController.registrarReserva);
router.get('/', reservaController.consultarReservas);
router.patch('/:id/checkin', reservaController.realizarCheckIn);

module.exports = router;

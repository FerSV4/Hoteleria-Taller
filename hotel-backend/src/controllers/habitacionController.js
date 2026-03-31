const HabitacionFactory = require('../services/habitacionFactory');
const prisma = require('../config/db');

const obtenerTiposDisponibles = async (req, res) => {
    try {
        const opciones = await prisma.habitacion.findMany({
            distinct: ['tipo'],
            select: { tipo: true }
        });
        return res.status(200).json({ data: opciones });
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener tipos de habitación." });
    }
};

const procesarSeleccionVariacion = async (req, res) => {
    try {
        const { tipo } = req.body;

        const caracteristicas = await HabitacionFactory.obtenerCaracteristicasBase(tipo);

        return res.status(200).json({
            mensaje: `Variación ${tipo} correcta`,
            data: caracteristicas
        });

    } catch (error) {
        if (error.message === 'TIPO_INVALIDO') {
            return res.status(400).json({
                error: "Invalido",
                mensaje: "Debe seleccionar un tipo válido."
            });
        }
        return res.status(500).json({ error: "Error aplicando hab." });
    }
};

module.exports = {
    obtenerTiposDisponibles,
    procesarSeleccionVariacion
};
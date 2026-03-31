const reservaService = require('../services/reservaService');

const registrarReserva = async (req, res) => {
    try {
        const { huesped_id, habitacion_id, fecha_ingreso, fecha_salida, cantidad_personas } = req.body;

        if (!huesped_id || !habitacion_id || !fecha_ingreso || !fecha_salida || !cantidad_personas) {
            return res.status(400).json({
                error: "Datos incompletos",
                mensaje: "Todos los espacios son necesarios para crear la reserva."
            });
        }

        const nuevaReserva = await reservaService.crearReserva({
            huesped_id,
            habitacion_id,
            fecha_ingreso,
            fecha_salida,
            cantidad_personas
        });

        return res.status(201).json({
            mensaje: "Reserva registrada. OK",
            data: nuevaReserva
        });

    } catch (error) {
        if (error.message === 'FECHAS_INVALIDAS') {
            return res.status(400).json({ error: "Validación fallida", mensaje: "La fecha de salida debe ser despues a la fecha de ingreso." });
        }
        if (error.message === 'CAPACIDAD_EXCEDIDA') {
            return res.status(400).json({ error: "NoSeHizo", mensaje: "La cantidad de personas supera la capacidad de la habitacion." });
        }
        if (error.message === 'SOLAPAMIENTO') {
            return res.status(409).json({ error: "problema", mensaje: "La habitación ya esta reservada en esas fechas." });
        }
        if (error.message === 'HABITACION_NO_EXISTE') {
            return res.status(404).json({ error: "No hay", mensaje: "La habitación no existe" });
        }

        console.error("Error:", error);
        return res.status(500).json({ error: "Error en reserva" });
    }
};


const consultarReservas = async (req, res) => {
    try {
        const reservas = await reservaService.obtenerReservasActivasYFuturas();

        if (reservas.length === 0) {
            return res.status(200).json({
                mensaje: "No hay en este momento. BAD",
                data: []
            });
        }

        return res.status(200).json({
            data: reservas
        });

    } catch (error) {
        console.error("Error en consultarReservas:", error);
        return res.status(500).json({ error: "Error con la lista" });
    }
};


const realizarCheckIn = async (req, res) => {
    try {
        const { id } = req.params;

        const reservaActualizada = await reservaService.registrarCheckIn(id);

        return res.status(200).json({
            mensaje: "Check-in realizado, En curso. OK",
            data: reservaActualizada
        });

    } catch (error) {
        if (error.message === 'RESERVA_NO_ENCONTRADA') {
            return res.status(404).json({ error: "No encontrado", mensaje: "La reserva no existe" });
        }
        if (error.message === 'RESERVA_CANCELADA') {
            return res.status(400).json({ error: "Operación no permitida", mensaje: "No se puede hacer check-in de una reserva cancelada." });
        }
        if (error.message === 'CHECKIN_DUPLICADO') {
            return res.status(409).json({ error: "Hay problemas", mensaje: "Esta reserva ya tiene check-in" });
        }

        console.error("Error en endpoint RealizarCheckin:", error);
        return res.status(500).json({ error: "Error con el checkin" });
    }
};



module.exports = {
    registrarReserva,
    consultarReservas,
    realizarCheckIn
};
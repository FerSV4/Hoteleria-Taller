const huespedService = require('../services/huespedService');

const crearHuesped = async (req, res) => {
    try {
        const { documento, nombre_completo, telefono, correo } = req.body;

        if (!documento || !nombre_completo) {
            return res.status(400).json({
                error: "Validación fallida",
                mensaje: "Los campos 'documento' y 'nombre_completo' son obligatorios."
            });
        }

        const nuevoHuesped = await huespedService.registrarHuesped({
            documento,
            nombre_completo,
            telefono,
            correo
        });

        return res.status(201).json({
            mensaje: "Huésped registrad0. OK",
            data: nuevoHuesped
        });

    } catch (error) {
        if (error.message === 'DUPLICADO') {
            return res.status(409).json({ 
                error: "Problemas",
                mensaje: "Ya hay un huesped con ese carnet de identidad."
            });
        }

        console.error("Error:", error);
        return res.status(500).json({ error: "Error al registrar." });
    }
};

const consultarHuesped = async (req, res) => {
    try {
        const { documento } = req.params;

        const huesped = await huespedService.obtenerHuespedPorDocumento(documento);

        if (!huesped) {
            return res.status(404).json({
                error: "No Existe",
                mensaje: `No existe ningún huésped registrado con ese carnet: ${documento}.`
            });
        }

        return res.status(200).json({
            mensaje: "Huésped existente",
            data: huesped
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Error con la busqueda" });
    }
};

module.exports = {
    crearHuesped,
    consultarHuesped
};
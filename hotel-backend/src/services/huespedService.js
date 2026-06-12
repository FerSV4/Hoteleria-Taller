const prisma = require('../config/db');

const registrarHuesped = async (datosHuesped) => {
    const huespedExistente = await prisma.huesped.findUnique({
        where: { documento: datosHuesped.documento }
    });

    //if (huespedExistente) {
    //    throw new Error('DUPLICADO');
    //}

    const nuevoHuesped = await prisma.huesped.create({
        data: datosHuesped
    });

    return nuevoHuesped;
};
const obtenerHuespedPorDocumento = async (documento) => {
    const huesped = await prisma.huesped.findUnique({
        where: { documento: documento }
    });
    return huesped;
};

module.exports = {
    registrarHuesped,
    obtenerHuespedPorDocumento
};
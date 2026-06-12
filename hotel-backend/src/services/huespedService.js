const prisma = require('../config/db');

const registrarHuesped = async (datosHuesped) => {
    //En este refactor mejoramos la funcion  del registro, trayendo solo el id, para verif si existe o no.
    const huespedExistente = await prisma.huesped.findUnique({
        where: { documento: datosHuesped.documento },
        select: { id: true }
    });

    //funcion de verificacion de duplicador, despues del retro...tdd
    if (huespedExistente) {
        throw new Error('DUPLICADO');
    }

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
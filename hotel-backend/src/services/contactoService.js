const prisma = require('../config/db');

const obtenerContactos = async () => {
    const contactos = await prisma.contacto_servicio.findMany({
        select: {
            id: true,
            nombre_servicio: true,
            encargado: true,
            telefono: true
        }
    });
    return contactos;
};

module.exports = {
    obtenerContactos
};
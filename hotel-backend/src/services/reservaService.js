const prisma = require('../config/db');

const ESTADOS_RESERVA = {
    RESERVADA: 'Reservada',
    EN_CURSO: 'En curso',
    CANCELADA: 'Cancelada'
};

const validarReglaFechaCapacidad = ({ ingreso, salida, cantidadPersonas, capacidadHabitacion }) => {
    if (salida <= ingreso) {
        throw new Error('FECHAS_INVALIDAS');
    }
    if (cantidadPersonas > capacidadHabitacion) {
        throw new Error('CAPACIDAD_EXCEDIDA');
    }
};

// Este metodo crear reserva ahora tiene responsabilidad unica de su negocio (Antes tenia el problema de mixed responsibility)
const crearReserva = async (datosReserva) => {
    const { huesped_id, habitacion_id, fecha_ingreso, fecha_salida, cantidad_personas } = datosReserva;

    const ingreso = new Date(fecha_ingreso);
    const salida = new Date(fecha_salida);

    const habitacion = await prisma.habitacion.findUnique({
        where: { id: habitacion_id }
    });

    if (!habitacion) {
        throw new Error('HABITACION_NO_EXISTE');
    }

    // Aqui se delega esa regla de las fechas y capacidad a la nueva funcion 
    validarReglaFechaCapacidad({
    ingreso, 
    salida, 
    cantidadPersonas: cantidad_personas, 
    capacidadHabitacion: habitacion.capacidad
});

    const reservaExistente = await prisma.reserva.findFirst({
        where: {
            habitacion_id: habitacion_id,
            estado: { not: 'Cancelada' },
            AND: [
                { fecha_ingreso: { lt: salida } },
                { fecha_salida: { gt: ingreso } }
            ]
        }
    });

    if (reservaExistente) {
        throw new Error('SOLAPAMIENTO');
    }

    const nuevaReserva = await prisma.reserva.create({
        data: {
            huesped_id,
            habitacion_id,
            fecha_ingreso: ingreso,
            fecha_salida: salida,
            cantidad_personas,
            estado: ESTADOS_RESERVA.RESERVADA
        }
    });

    return nuevaReserva;
};

const obtenerReservasActivasYFuturas = async () => {

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const reservas = await prisma.reserva.findMany({
        where: {
            estado: {
                in: ['Reservada', 'En curso']
            },
            fecha_salida: {
                gte: hoy 
            }
        },
        orderBy: {
            fecha_ingreso: 'asc'
        },
        include: {
            huesped: {
                select: { nombre_completo: true, documento: true }
            },
            habitacion: {
                select: { numero: true, tipo: true }
            }
        }
    });


    return reservas;
};

const registrarCheckIn = async (idReserva) => {
    const parsedId = parseInt(idReserva);
    const reserva = await prisma.reserva.findUnique({
        where: { id: parsedId },
        select: { estado: true }
    });

    if (!reserva) {
        throw new Error('RESERVA_NO_ENCONTRADA');
    }

    if (reserva.estado === ESTADOS_RESERVA.CANCELADA) {
        throw new Error('RESERVA_CANCELADA');
    }

    //Validacion de checkin, despues del retro...tdd
    if (reserva.estado === ESTADOS_RESERVA.EN_CURSO) {
        throw new Error('CHECKIN_DUPLICADO');
    }

    const reservaActualizada = await prisma.reserva.update({
        where: { id: parsedId },
        data: {
            estado: ESTADOS_RESERVA.EN_CURSO
        }
    });

    return reservaActualizada;
};

const cancelarReserva = async (idReserva) => {
    //refactor en este caso es verificar el estado antes de intentar actualizarla.
    const reserva = await prisma.reserva.findUnique({
        where: { id: idReserva },
        select: { estado: true }
    });

    if (!reserva) {
        throw new Error('RESERVA_NO_EXISTE');
    }

    if (reserva.estado === 'Cancelada') {
        throw new Error('RESERVA_YA_CANCELADA');
    }
    
    return await prisma.reserva.update({
        where: { id: idReserva },
        data: { estado: 'Cancelada' }
    });
};
module.exports = {
    crearReserva,
    obtenerReservasActivasYFuturas,
    registrarCheckIn,
    validarReglaFechaCapacidad,
    cancelarReserva
};
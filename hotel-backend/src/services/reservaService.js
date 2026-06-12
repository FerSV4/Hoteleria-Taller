const prisma = require('../config/db');

const validarReglaFechaCapacidad = (ingreso, salida, cantidadPersonas, capacidadHabitacion) => {
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
    validarReglaFechaCapacidad(ingreso, salida, cantidad_personas, habitacion.capacidad);

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
            estado: 'Reservada'
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
    const reserva = await prisma.reserva.findUnique({
        where: { id: parseInt(idReserva) }
    });

    if (!reserva) {
        throw new Error('RESERVA_NO_ENCONTRADA');
    }

    if (reserva.estado === 'Cancelada') {
        throw new Error('RESERVA_CANCELADA');
    }

    if (reserva.estado === 'En curso') {
        throw new Error('CHECKIN_DUPLICADO');
    }

    const reservaActualizada = await prisma.reserva.update({
        where: { id: parseInt(idReserva) },
        data: {
            estado: 'En curso'
        }
    });

    return reservaActualizada;
};

const cancelarReserva = async (idReserva) => {
    // Vacio en este caso pa la prueba tdd
};
module.exports = {
    crearReserva,
    obtenerReservasActivasYFuturas,
    registrarCheckIn,
    validarReglaFechaCapacidad,
    cancelarReserva
};
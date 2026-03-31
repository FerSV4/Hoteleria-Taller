const prisma = require('../config/db');

class HabitacionFactory {
    //Servicio dedicado a las hab.
    static async obtenerCaracteristicasBase(tipoSolicitado) {
        const tiposValidos = [
            'Simple', 
            'Suite', 
            'Doble con camas individuales', 
            'Doble matrimonial'
        ];

        if (!tiposValidos.includes(tipoSolicitado)) {
            throw new Error('TIPO_INVALIDO');
        }
        //La obtencion de los datos de la hab ,,,,,,,,
        const caracteristicas = await prisma.habitacion.findFirst({
            where: { tipo: tipoSolicitado },
            select: {
                id: true,
                tipo: true,
                capacidad: true,
                precio_base: true,
                descripcion: true
            }
        });

        if (!caracteristicas) {
            throw new Error('TIPO_NO_DISPONIBLE');
        }

        return caracteristicas;
    }
}

module.exports = HabitacionFactory;
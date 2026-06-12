const { crearReserva, cancelarReserva } = require('./reservaService');
const prisma = require('../config/db');

// Mock de prisma...
jest.mock('../config/db', () => ({
    habitacion: { findUnique: jest.fn() },
    reserva: { findFirst: jest.fn(), create: jest.fn() }
}));

describe('Prueba de las reglas de negocio - Reservas', () => {
    
    it('El servicio debe indicar error por CAPACIDAD_EXCEDIDA', async () => {
        // Arrg: Hab. para 2 p
        prisma.habitacion.findUnique.mockResolvedValue({ id: 2, capacidad: 2 });

        const datosReserva = {
            huesped_id: 1,
            habitacion_id: 2,
            fecha_ingreso: '2026-12-10',
            fecha_salida: '2026-12-12',
            cantidad_personas: 10 // Excedente, pruebo con 10 personas...
        };

        // AcAs: Servicio debe lanzar error por la capacidad...
        await expect(crearReserva(datosReserva)).rejects.toThrow('CAPACIDAD_EXCEDIDA');
        
        expect(prisma.reserva.create).not.toHaveBeenCalled();
    });

    it('El servicio tiene que rechazar una reserva ya cancelada', async () => {
        // Arrg: aqui simulo que la reserva esta cancelada...
        prisma.reserva.findUnique = jest.fn().mockResolvedValue({ id: 99, estado: 'Cancelada' });
        prisma.reserva.update = jest.fn();

        // Ac-As: Se reintenta cancelar cuando ya esta cancelada..
        await expect(cancelarReserva(99)).rejects.toThrow('RESERVA_YA_CANCELADA');
        expect(prisma.reserva.update).not.toHaveBeenCalled();
    });
});
const { crearReserva } = require('./reservaService');
const prisma = require('../config/db');

// Mock de prisma...
jest.mock('../config/db', () => ({
    habitacion: { findUnique: jest.fn() },
    reserva: { findFirst: jest.fn(), create: jest.fn() }
}));

describe('Prueba de logica N.1 - Reservas', () => {
    
    it('debe lanzar error CAPACIDAD_EXCEDIDA si hay más personas que capacidad', async () => {
        // Arrg: Hab. para 2 p
        prisma.habitacion.findUnique.mockResolvedValue({ id: 1, capacidad: 2 });

        const datosReserva = {
            huesped_id: 1,
            habitacion_id: 1,
            fecha_ingreso: '2026-10-10',
            fecha_salida: '2026-10-12',
            cantidad_personas: 4 // Excedente
        };

        // AcAs: Servicio debe lanzar error por la capacidad...
        await expect(crearReserva(datosReserva)).rejects.toThrow('CAPACIDAD_EXCEDIDA');
        
        expect(prisma.reserva.create).not.toHaveBeenCalled();
    });
});
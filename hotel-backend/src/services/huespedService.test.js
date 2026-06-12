const { registrarHuesped } = require('./huespedService');
const prisma = require('../config/db');

// Mock de prisma...
jest.mock('../config/db', () => ({
    huesped: { findUnique: jest.fn(), create: jest.fn() }
}));

describe('Pruebas de reglas de negocio en serv. Huespedes', () => {
    
    it('No se debe permitir regist. un huesped con Ci duplicado', async () => {
        // Arrg: Creamos el usuario falso con el ci y demas...
        prisma.huesped.findUnique.mockResolvedValue({ id: 1, documento: '90902331' });
        prisma.huesped.create = jest.fn();

        const datosHuesped = {
            nombre_completo: 'Yan pol',
            documento: '90902331',
            telefono: '85777132'
        };

        // Ac--As: Aqui ya intentamos el registro, pero nos tiene que botar error de duplicado...
        await expect(registrarHuesped(datosHuesped)).rejects.toThrow('DUPLICADO');
        
        expect(prisma.huesped.create).not.toHaveBeenCalled();
    });
});
const contactoService = require('../services/contactoService');

const getContactos = async (req, res) => {
    try {
        const contactos = await contactoService.obtenerContactos();
        
        if (contactos.length === 0) {
            return res.status(200).json({ 
                mensaje: "No hay contactos por ahora",
                data: [] 
            });
        }

        return res.status(200).json({ data: contactos });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Error de datos" });
    }
};

module.exports = {
    getContactos
};
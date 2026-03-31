require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 


//Endpoints
const contactoRoutes = require('./routes/contactoRoutes');
const huespedRoutes = require('./routes/huespedRoutes');
const habitacionRoutes = require('./routes/habitacionRoutes');
const reservaRoutes = require('./routes/reservaRoutes');

app.use('/api/contactos', contactoRoutes);
app.use('/api/huespedes', huespedRoutes);
app.use('/api/habitaciones', habitacionRoutes);
app.use('/api/reservas', reservaRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor OK' });
});

app.listen(port, () => {
  console.log(`Ejecucion en http://localhost:${port}`);
});
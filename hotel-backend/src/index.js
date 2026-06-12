require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = Number(process.env.PORT) || 3000;

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

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor OK' });
});

const server = app.listen(port, (error) => {
  if (error) {
    console.error(`No se pudo iniciar el servidor en el puerto ${port}:`, error.message);
    process.exit(1);
  }
  console.log(`Ejecucion en el puerto ${port}`);
});

server.on('error', (error) => {
  console.error(`Error del servidor en el puerto ${port}:`, error.message);
});

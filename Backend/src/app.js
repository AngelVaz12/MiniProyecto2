const express = require('express');
const cors = require('cors');

const productoRoutes = require('./routes/productoRoutes');

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// RUTAS
app.use('/api/productos', productoRoutes);

// PRUEBA
app.get('/', (req, res) => {
    res.send('API funcionando');
});

module.exports = app;
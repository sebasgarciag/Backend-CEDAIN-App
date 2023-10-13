// 3rd Party Modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv/config');
require('./models/associations')

// Local Modules

const productoRoutes = require("./routes/producto.routes");
const apiEntradas = require("./routes/entrada.routes");
const apiSalidas = require("./routes/salida.routes");
const apiUsuarios = require("./routes/usuario.routes");
const apiInventario = require("./routes/inventario.routes");
const db = require("./models");
//db.Usuario.sync({ alter: true }); ((((TO BE USED BY EVERYONE IN THE FUTURE. NACHO, KIKE, ANGEL. DO NOT DELETE))))
//db.Producto.sync({ force: true });

// Server Initialization
const app = express();

// Middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

// Routes will be written here


//Cada equipo pone sus rutas aqui <----------------------------------------
app.use('/entradas', apiEntradas);
app.use('/salidas', apiSalidas);
app.use('/usuarios', apiUsuarios);
app.use('/productos', productoRoutes);
app.use('/inventario', apiInventario);
//app.use('/', apiSalidas);




// Establish Database Connection (if concerned about data persistence)
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Server Listen
const PORT = process.env.PORT || 8080
module.exports = app.listen(PORT);



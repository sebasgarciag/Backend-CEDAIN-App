// 3rd Party Modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv/config');

// Local Modules
const apiEntradas = require("./routes/entrada.routes");
const apiSalidas = require("./routes/salida.routes");
const entradaRoutes = require("./routes/entrada.routes");
const usuarioRoutes = require("./routes/usuario.routes");
const db = require("./models");
//db.Usuario.sync({ alter: true }); ((((TO BE USED BY EVERYONE IN THE FUTURE. NACHO, KIKE, ANGEL. DO NOT DELETE))))

// Server Initialization
const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

// Routes will be written here
app.use('/entradas', entradaRoutes);
app.use('/usuarios', usuarioRoutes);
//Cada equipo pone sus rutas aqui <----------------------------------------
app.use('/entradas', apiEntradas);
app.use('/salidas', apiSalidas);
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
app.listen(PORT, (error) => {
    if(!error) {
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});

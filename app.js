// 3rd Party Modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv/config');

// Local Modules
const apiRoutes = require("./routes/entrada.routes");
const db = require("./models");

// Server Initialization
const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

// Routes will be written here
app.use('/', apiRoutes);

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

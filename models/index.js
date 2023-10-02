const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: { //para organizar como los usarios hacen conexiones a la base de datos.
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Entrada = require("./entrada.model.js")(sequelize, Sequelize);
db.Comunidad = require("./comunidad.model.js")(sequelize, Sequelize);
db.Evento = require("./evento.model.js")(sequelize, Sequelize);
db.Usuario = require("./usuario.model.js")(sequelize, Sequelize);
db.Almacen = require("./almacen.model.js")(sequelize, Sequelize);
db.Producto = require("./producto.model.js")(sequelize, Sequelize);
db.EntradaDetalles = require("./entradaDetalles.model.js")(sequelize, Sequelize);
db.Salida = require("./salida.model.js")(sequelize, Sequelize);
db.SalidaDetalle = require("./salidaDetalles.model.js")(sequelize, Sequelize);
db.Productos = require("./productos.model.js")(sequelize, Sequelize);
db.Inventario = require("./inventario.model.js")(sequelize, Sequelize);

module.exports = db;
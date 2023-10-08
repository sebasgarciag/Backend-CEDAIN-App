// Archivo que contiene las asociaciones entre tablas para hacer joins

const db = require('../models');

db.Comunidad.hasMany(db.Entrada , {foreignKey: 'id_comunidad'});
db.Entrada.belongsTo(db.Comunidad , {foreignKey: 'id_comunidad'});

db.Usuario.hasMany(db.Entrada , {foreignKey: 'id_usuario'});
db.Entrada.belongsTo(db.Usuario , {foreignKey: 'id_usuario'});

db.Usuario.hasMany(db.Salida , {foreignKey: 'id_usuario'});
db.Salida.belongsTo(db.Usuario , {foreignKey: 'id_usuario'});

db.Almacen.hasMany(db.Entrada , {foreignKey: 'id_almacen'});
db.Entrada.belongsTo(db.Almacen , {foreignKey: 'id_almacen'});

db.Almacen.hasMany(db.Salida , {foreignKey: 'id_almacen'});
db.Salida.belongsTo(db.Almacen , {foreignKey: 'id_almacen'});

db.Evento.hasMany(db.Entrada , {foreignKey: 'id_evento'});
db.Entrada.belongsTo(db.Evento , {foreignKey: 'id_evento'});

db.Evento.hasMany(db.Salida , {foreignKey: 'id_evento'});
db.Salida.belongsTo(db.Evento , {foreignKey: 'id_evento'});

db.Tamanio.hasMany(db.Producto , {foreignKey: 'id_tamanio'});
db.Producto.belongsTo(db.Tamanio , {foreignKey: 'id_tamanio'});

db.Producto.hasMany(db.EntradaDetalles , {foreignKey: 'id_producto'});
db.EntradaDetalles.belongsTo(db.Producto , {foreignKey: 'id_producto'});

db.Producto.hasMany(db.SalidaDetalle , {foreignKey: 'id_producto'});
db.SalidaDetalle.belongsTo(db.Producto , {foreignKey: 'id_producto'});

db.Almacen.hasMany(db.Inventario , {foreignKey: 'id_almacen'});
db.Inventario.belongsTo(db.Almacen , {foreignKey: 'id_almacen'});

db.Producto.hasMany(db.Inventario , {foreignKey: 'id_producto'});
db.Inventario.belongsTo(db.Producto , {foreignKey: 'id_producto'});

db.TipoEmpleado.hasMany(db.Usuario, { foreignKey: 'id_Tipo' });
db.Usuario.belongsTo(db.TipoEmpleado, { foreignKey: 'id_Tipo' });

// db.Almacen.hasMany(db.Usuario, { foreignKey: 'id_almacen' });
// db.Usuario.belongsTo(db.Almacen, { foreignKey: 'id_almacen' });

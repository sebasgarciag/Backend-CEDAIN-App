/**
 * Representa un Producto en la base de datos. Aquí se describen todas las columnas y sus tipos en la tabla 'productos'.
 *
 * @constructor
 * @property {number} id_producto - PK, autoincremental.
 * @property {string} nombre - Nombre del producto.
 * @property {number} [id_tamanio] - ID del tamaño del producto.
 * @property {string} [medida] - Medida del producto.
 * @property {number} precio_venta - Precio de venta del producto.
 * @property {number} precio_trueque - Precio de trueque del producto.
 * @property {number} id_categoria - ID de la categoría a la que pertenece el producto.
 * @property {string} nombre_corto - Nombre corto del producto.
 * @property {boolean} [suspendido] - Indica si el producto está suspendido (true o false).
 * @property {Buffer} [imagen] - Imagen del producto en formato binario.
 */
module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("productos", {
        id_producto: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING(80),
            allowNull: false
        },
        id_tamanio: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        medida: {
            type: Sequelize.STRING(30),
            allowNull: true
        },
        precio_venta: {
            type: Sequelize.DECIMAL(10, 2), // 10 dígitos en total, 2 decimales
            allowNull: false
        },
        precio_trueque: {
            type: Sequelize.DECIMAL(10, 2), // 10 dígitos en total, 2 decimales
            allowNull: false
        },
        id_categoria: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        nombre_corto: {
            type: Sequelize.STRING(40),
            allowNull: false
        },
        suspendido: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        imagen: {
            type: Sequelize.BLOB('long'),
            allowNull: true
        }
  
    }, {
        tableName: 'productos',
        timestamps: false // TRUE if there is createdAt and updatedAt on table.
    });
  
    return Producto;
};
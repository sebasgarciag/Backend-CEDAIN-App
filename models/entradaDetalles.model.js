/**
 * Representa una los detalles de una entrada. Aqui estan todas las columnas y su tipo dentro de la tabla 'entradas-detalle'
 * 
 * @constructor
 * @property {number} id_entrada_detalle - PK, autoincrements.
 * @property {number} [id_entrada] - Representa la entrada la cual estos detalles pertencen.
 * @property {string} [id_producto] - Representa el producto el cual estos detalles perteneces.
 * @property {string} [cantidad] - Numero de este producto en.
 * @property {number} [precio_unitario] - Precio de uno de estos productos.
 */

module.exports = (sequelize, Sequelize) => {
    const EntradaDetalles = sequelize.define("entradaDetalles", {
        id_entrada_detalle: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        id_entrada: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        id_producto: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        precio_unitario: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        }, 
    }, {
            tableName: 'entradas_detalle',
            timestamps: false, // TRUE if there is createdAt and updatedAt on table.

            uniqueKeys: {
                detalles_unique: {
                    fields: ['id_entrada', 'id_producto']
                }
            }
    });
  
    return EntradaDetalles;
};

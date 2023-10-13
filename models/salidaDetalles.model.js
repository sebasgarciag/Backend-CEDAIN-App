/**
 * 
 * @constructor
 * @property {number} id_salida_detalle - PK, autoincrements.
 * @property {numbre} [id_salida] - el id de la salida hecha
 * @property {number} [id_producto] - el id de cada producto
 *  @property {number} [cantidad] - cantidad de los productos
 * @property {number} [precio] - precio venta del producto
 */
module.exports = (sequelize, Sequelize) => {
    const Detalles = sequelize.define('Detalles', {
        id_salida_detalle: { //This information is taken from how the table is structured on the DB. (read the query)
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        id_salida: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        id_producto: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
        },
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        precio_unitario: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: 'salidas_detalle',
        timestamps: false, // TRUE if there is createdAt and updatedAt on table.

        uniqueKeys: {
            detalles_unique: {
                fields: ['id_salida', 'id_producto']
            }
        }
    });

    return Detalles;
};
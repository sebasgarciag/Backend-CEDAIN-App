module.exports = (sequelize, Sequelize) => {
    const Detalles = sequelize.define('Detalles', {
        id_salida_detalle: { //This information is taken from how the table is structured on the DB. (read the query)
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        id_salida: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_producto: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        precio_unitario: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true
        }
    }, {
        tableName: 'salidas_detalle',
        timestamps: false // TRUE if there is createdAt and updatedAt on table.
    });

    return Detalles;
};
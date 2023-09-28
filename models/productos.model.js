module.exports = (sequelize, Sequelize) => {
    const Productos = sequelize.define('Productos', {
        id_producto: { //This information is taken from how the table is structured on the DB. (read the query)
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }

    }, {
        tableName: 'productos',
        timestamps: false // TRUE if there is createdAt and updatedAt on table.
    });

    return Productos;
};
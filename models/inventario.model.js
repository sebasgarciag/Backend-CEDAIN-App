module.exports = (sequelize, Sequelize) => {
    const Inventario = sequelize.define('Inventario', {
        id_inventario: { //This information is taken from how the table is structured on the DB. (read the query)
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        id_producto: { //This information is taken from how the table is structured on the DB. (read the query)
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_almacen: { //This information is taken from how the table is structured on the DB. (read the query)
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cantidad: { //This information is taken from how the table is structured on the DB. (read the query)
            type: Sequelize.INTEGER,
            allowNull: false
        }
        
    }, {
        tableName: 'inventario',
        timestamps: false // TRUE if there is createdAt and updatedAt on table.
    });

    return Inventario;
};

module.exports = (sequelize, Sequelize) => {
    const Inventarios = sequelize.define('Inventarios', {
        Id_inventario: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        id_producto: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        id_almacen: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'inventarios',
        timestamps: false // TRUE if there is createdAt and updatedAt on table.
    });
    
    return Inventarios;

};

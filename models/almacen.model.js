module.exports = (sequelize, Sequelize) => {
    const Almacen = sequelize.define('Almacen', {
        id_almacen: { //This information is taken from how the table is structured on the DB. (read the query)
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        ciudad: {
            type: Sequelize.STRING(15),
            allowNull: false
        }
    }, {
        tableName: 'almacenes',
        timestamps: false // TRUE if there is createdAt and updatedAt on table.
    });

    return Almacen;
};
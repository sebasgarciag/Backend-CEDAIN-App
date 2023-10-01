module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('Usuario', {
        id_usuarios: { //This information is taken from how the table is structured on the DB. (read the query)
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING(40),
            allowNull: true
        },
        apellido_paterno: {
            type: Sequelize.STRING(40),
            allowNull: true
        },
        apellido_materno: {
            type: Sequelize.STRING(40),
            allowNull: true
        },
        tipo: {
            type: Sequelize.STRING(40),
            allowNull: true
        },
        password: {
            type: Sequelize.STRING(40),
            allowNull: true
        },
        id_almacen: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true
        }
    }, {
        tableName: 'usuarios',
        timestamps: false // TRUE if there is createdAt and updatedAt on table.
    });

    return Usuario;
};
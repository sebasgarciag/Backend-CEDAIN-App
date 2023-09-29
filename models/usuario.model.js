module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('Usuario', {
        id_usuarios: { //This information is taken from how the table is structured on the DB. (read the query)
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
    }, {
        tableName: 'usuarios',
        timestamps: false // TRUE if there is createdAt and updatedAt on table.
    });

    return Usuario;
};
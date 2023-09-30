module.exports = (sequelize, Sequelize) => {
    const Comunidad = sequelize.define('Comunidad', {
        id_comunidad: { //This information is taken from how the table is structured on the DB. (read the query)
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING(30),
            allowNull: true
        }
    }, {
        tableName: 'comunidades',
        timestamps: false // TRUE if there is createdAt and updatedAt on table.
    });

    return Comunidad;
};
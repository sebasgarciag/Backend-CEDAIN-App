module.exports = (sequelize, Sequelize) => {
    const Tamanio = sequelize.define('Tamanio', {
        id_tamanio: { //This information is taken from how the table is structured on the DB. (read the query)
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descripcion: {
            type: Sequelize.STRING(30),
            allowNull: false
        }
    }, {
        tableName: 'tamanios',
        timestamps: false // TRUE if there is createdAt and updatedAt on table.
    });

    return Tamanio;
};
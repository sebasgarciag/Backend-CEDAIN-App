module.exports = (sequelize, Sequelize) => {
    const Evento = sequelize.define('Evento', {
        id_evento: { //This information is taken from how the table is structured on the DB. (read the query)
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING(40),
            allowNull: false
        }
    }, {
        tableName: 'eventos',
        timestamps: false // TRUE if there is createdAt and updatedAt on table.
    });

    return Evento;
};



/**
 * 
 * @constructor
 * @property {number} id_comunidad - PK, autoincrements.
 * @property {string} [nombre] -nombre de la comunidad

 */
module.exports = (sequelize, Sequelize) => {
    const Comunidad = sequelize.define('Comunidad', {
        id_comunidad: { //This information is taken from how the table is structured on the DB. (read the query)
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING(30),
            allowNull: false,
        }
    }, {
        tableName: 'comunidades',
        timestamps: false // TRUE if there is createdAt and updatedAt on table.
    });

    return Comunidad;
};
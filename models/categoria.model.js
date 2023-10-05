module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define('Categoria', {
        id_categoria: { //This information is taken from how the table is structured on the DB. (read the query)
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'categoria',
        timestamps: false // TRUE if there is createdAt and updatedAt on table.
    });

    return Categoria;
};
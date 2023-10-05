
module.exports = (sequelize, Sequelize) => {
    
    const Productos = sequelize.define('Productos', {
        id_producto: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        id_tamanio: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        medida: {
            type: Sequelize.STRING,
            allowNull: false
        },
        precio: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        imagen: {
            type: Sequelize.BLOB,
            allowNull: false
        },
        nombre_corto: {
            type: Sequelize.STRING(30),
            allowNull: false
        }
    }, {
        tableName: 'productos',
        timestamps: false // TRUE if there is createdAt and updatedAt on table.
    });

    

    return Productos;
};

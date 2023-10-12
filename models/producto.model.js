module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("productos", {
        id_producto: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING(80),
            allowNull: false
        },
        id_tamanio: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        medida: {
            type: Sequelize.STRING(30),
            allowNull: true
        },
        precio_venta: {
            type: Sequelize.DECIMAL(10, 2), // 10 dígitos en total, 2 decimales
            allowNull: false
        },
        precio_trueque: {
            type: Sequelize.DECIMAL(10, 2), // 10 dígitos en total, 2 decimales
            allowNull: false
        },
        id_categoria: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        nombre_corto: {
            type: Sequelize.STRING(40),
            allowNull: false
        },
        suspendido: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
  
    }, {
        tableName: 'productos',
        timestamps: false // TRUE if there is createdAt and updatedAt on table.
    });
  
    return Producto;
};



module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("productos", {
        id_producto: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING(80),
            allowNull: true
        },
        id_tamanio: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        medida: {
            type: Sequelize.STRING(30),
            allowNull: true
        },
        precio: {
            type: Sequelize.DECIMAL(10, 2), // 10 dígitos en total, 2 decimales
            allowNull: true
        },
        categoria: {
            type: Sequelize.STRING(30),
            allowNull: true
        },
        nombre_corto: {
            type: Sequelize.STRING(40),
            allowNull: true
        }
  
    });
  
    return Producto;
};

module.exports = (sequelize, Sequelize) => {
    const EntradaDetalles = sequelize.define("entradaDetalles", {
        id_entrada_detalle: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        id_entrada: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        id_producto: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        id_cantidad: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        precio_unitario: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: true
        }
    });
  
    return EntradaDetalles;
};

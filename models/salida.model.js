
module.exports = (sequelize, Sequelize) => {
    const Salida = sequelize.define("salidas", {
        id_salida: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        fecha: {
            type: Sequelize.DATE,
            allowNull: true
        },
        folio: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        facturar: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        serie: {
            type: Sequelize.STRING(5),
            allowNull: true
        },
        observaciones: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        id_usuario: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true
        },
        id_almacen: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true
        },
        id_evento: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true
        },
        receptor: {
            type: Sequelize.STRING(40),
            allowNull: true
        },
        id_tipo_pago: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true
        }
    });
  
    return Salida;
};

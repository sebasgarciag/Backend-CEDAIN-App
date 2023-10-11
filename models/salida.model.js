
module.exports = (sequelize, Sequelize) => {
    const Salida = sequelize.define("salidas", {
        id_salida: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        fecha: {
            type: Sequelize.DATE,
            allowNull: false
        },
        folio: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        facturar: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        serie: {
            type: Sequelize.STRING(5),
            allowNull: false
        },
        observaciones: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        id_usuario: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        id_almacen: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        id_evento: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        receptor: {
            type: Sequelize.STRING(40),
            allowNull: false
        },
        id_tipo_pago: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true
        }
    });
  
    return Salida;
};


module.exports = (sequelize, Sequelize) => {
    const EntradaDetalles = sequelize.define("entradaDetalles", {
        id_entrada_detalle: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        id_entrada: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_producto: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        precio_unitario: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        }, 
    }, {
            tableName: 'entradas_detalle',
            timestamps: false, // TRUE if there is createdAt and updatedAt on table.

            uniqueKeys: {
                detalles_unique: {
                    fields: ['id_entrada', 'id_producto']
                }
            }
    });
  
    return EntradaDetalles;
};

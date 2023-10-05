module.exports = (sequelize, Sequelize) => {
    const TipoEmpleado = sequelize.define('TipoEmpleado', {
        id_Tipo: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        Tipo: {
            type: Sequelize.STRING(25),
            allowNull: false
        }
    }, {
        // desactivar los atributos de tiempo
        timestamps: false,
      
    });

    return TipoEmpleado;
};

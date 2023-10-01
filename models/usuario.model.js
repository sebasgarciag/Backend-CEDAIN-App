module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('Usuario', {
        id_usuarios: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING(40),
            allowNull: true
        },
        apellido_paterno: {
            type: Sequelize.STRING(40),
            allowNull: true
        },
        apellido_materno: {
            type: Sequelize.STRING(40),
            allowNull: true
        },
        tipo: {
            type: Sequelize.STRING(15),
            allowNull: true
        },
        id_almacen: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        correo: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'usuarios',
        timestamps: false
    });

    return Usuario;
};
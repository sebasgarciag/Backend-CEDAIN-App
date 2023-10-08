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
        id_Tipo: {
            type: Sequelize.INTEGER.UNSIGNED,
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
        tableName: 'usuario',
        timestamps: false
    });

    return Usuario;
};
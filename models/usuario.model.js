module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('Usuario', {
        id_usuario: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING(40),
            allowNull: false
        },
        apellido_paterno: {
            type: Sequelize.STRING(40),
            allowNull: false

        },
        apellido_materno: {
            type: Sequelize.STRING(40),
            allowNull: true

        },
        tipo: {
            type: Sequelize.STRING(50),
            allowNull: false

        },
        correo: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true

        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false

        }
    }, {
        tableName: 'usuarios',
        timestamps: false
    });

    return Usuario;
};
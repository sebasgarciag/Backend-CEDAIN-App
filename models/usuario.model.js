module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('Usuario', {
        id_usuario: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING(40),

        },
        apellido_paterno: {
            type: Sequelize.STRING(40),

        },
        apellido_materno: {
            type: Sequelize.STRING(40),

        },
        tipo: {
            type: Sequelize.STRING(50),

        },
        id_almacen: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Almacen',
                key: 'id_almacen'
            }
        },
        correo: {
            type: Sequelize.STRING(255),

        },
        password: {
            type: Sequelize.STRING(255),

        }
    }, {
        tableName: 'usuarios',
        timestamps: false
    });

    return Usuario;
};
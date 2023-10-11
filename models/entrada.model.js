/**
 * Representa una Entrada.
 * @constructor
 * @param {number} id - Id de entrada
 * @param {string} nombre - Nombre de pila?
 * @param {string} apellido - Primer apellido
 */
/*
exports.Entrada = function (id, nombre, apellido) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
};*/

module.exports = (sequelize, Sequelize) => {
    const Entrada = sequelize.define("entradas", {
        id_entrada: {
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
        emisor: {
            type: Sequelize.STRING(40),
            allowNull: false
        },
        id_comunidad: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        id_evento: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        }
    });
  
    return Entrada;
};

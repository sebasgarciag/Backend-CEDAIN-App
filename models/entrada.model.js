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
        serie: {
            type: Sequelize.STRING(5),
            allowNull: true
        },
        observaciones: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        id_usuario: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        id_almacen: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        emisor: {
            type: Sequelize.STRING(40),
            allowNull: true
        },
        id_comunidad: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        id_evento: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    });
  
    return Entrada;
};

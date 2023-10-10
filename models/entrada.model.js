/**
 * Representa una Entrada. Aqui estan todas las columnas y su tipo dentro de la tabla 'entradas'
 * 
 * @constructor
 * @property {number} id_entrada - PK, autoincrements.
 * @property {Date} [fecha] - la fecha.
 * @property {number} [folio] - Folio de la entrada.
 * @property {string} [serie] - Serie es anio + E de -Entrada- 2023E.
 * @property {string} [observaciones] - Observaciones agregadas por usuario al momento de hacer la entrada.
 * @property {number} [id_usuario] - usuario que creo dicha entrada.
 * @property {number} [id_almacen] - id del almacen donde entro la entrda.
 * @property {string} [emisor] - Es quien envio el paquete de entrada.
 * @property {number} [id_comunidad] - Representa la Comunidad de la que viene.
 * @property {number} [id_evento] - Representa el evento del que viene.
 */


module.exports = (sequelize, Sequelize) => {
    const Entrada = sequelize.define("entradas", {
        id_entrada: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
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

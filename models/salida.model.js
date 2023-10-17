/**
 * 
 * @constructor
 * @property {number} id_salida - PK, autoincrements.
 * @property {Date} [fecha] - la fecha.
 * @property {number} [folio] - Folio de la entrada.
 *  @property {number} [facturar] - 1 o 0 dependiendo si se va a facturar o no
 * @property {string} [serie] - Serie es anio + E de -Entrada- 2023E.
 * @property {string} [observaciones] - Observaciones agregadas por usuario al momento de hacer la entrada.
 * @property {number} [id_usuario] - usuario que creo dicha entrada.
 * @property {number} [id_almacen] - id del almacen donde entro la entrda.
 * @property {string} [receptor] - Es quien recbio la salida 
 * @property {number} [id_tipo_pago] - representa el tipo de pago en una venta
 * @property {number} [id_evento] - Representa el evento del que viene.
 */


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
            type: Sequelize.INTEGER,
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

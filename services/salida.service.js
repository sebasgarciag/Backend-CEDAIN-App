const db = require('../models');
const { Op } = require('sequelize');
const dbConfig = require('../config/db.config');

exports.buscarTodas = async function() { // RETURNS ALL
    salidas = await db.Salida.findAll();
    return salidas;
}

exports.crearSalidaDetalle = async function(salidaDetalle){

    nuevosDetalles = await db.SalidaDetalle.bulkCreate(salidaDetalle);
    return nuevosDetalles;

}
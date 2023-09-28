const db = require('../models');
const { Op } = require('sequelize');
const dbConfig = require('../config/db.config');

exports.buscarTodas = async function() { // RETURNS ALL
    salidas = await db.Salida.findAll();
    return salidas;
}
exports.buscarTodasComunidades = async function() { // RETURNS ALL
    comunidades = await db.Comunidad.findAll();
    return comunidades;
}
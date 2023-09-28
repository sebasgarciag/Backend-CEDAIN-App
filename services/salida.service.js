const db = require('../models');

exports.buscarTodas = async function() { // RETURNS ALL
    salidas = await db.Salidas.findAll();
    return salidas;
}

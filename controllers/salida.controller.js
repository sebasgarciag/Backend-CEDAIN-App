const salidaService = require('../services/salida.service');
const { validationResult } = require('express-validator');

exports.getBuscarTodas = async function (req, res) {
    let salida = await salidaService.buscarTodas();
    res.json(salida).status(200);
};

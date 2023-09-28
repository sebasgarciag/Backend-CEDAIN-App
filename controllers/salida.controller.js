const entradaService = require('../services/salida.service');
const { validationResult } = require('express-validator');

exports.getBuscarTodas = async function (req, res) {
    let entrada = await entradaService.buscarTodas();
    res.json(entrada).status(200);
};

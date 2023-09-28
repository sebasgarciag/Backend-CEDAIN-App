const salidaService = require('../services/salida.service');
const { validationResult } = require('express-validator');

exports.getBuscarTodas = async function (req, res) {
    let salida = await salidaService.buscarTodas();
    res.json(salida).status(200);
};
exports.getBuscarTodasComunidades = async function (req, res) {
    let Comunidades = await salidaService.buscarTodasComunidades();
    res.json(Comunidades).status(200);
};
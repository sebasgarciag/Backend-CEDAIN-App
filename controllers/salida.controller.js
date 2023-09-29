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
exports.getBuscarTodosEventos = async function (req, res) {
    let Eventos = await salidaService.buscarTodosEventos();
    res.json(Eventos).status(200);
};
exports.postSalidasDetalles = async function (req, res){
    let result = validationResult(req);
    
    console.log("======================");
    console.log("postSalidasDetalles");
    console.log("======================");
    if (result.errors.length > 0) {
        return res.status(400).json({ success: false, error: result }); //if routes.js sends error, controller catches and sends error #.
    } else {
        let productosSalida = req.body;
        let detallesCreados = await salidaService.crearSalidaDetalle(productosSalida);
        res.status(201).json(detallesCreados);
    } 
    
};


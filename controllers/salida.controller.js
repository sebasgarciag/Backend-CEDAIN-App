const salidaService = require('../services/salida.service');
const { validationResult } = require('express-validator');

exports.getBuscarTodas = async function (req, res) {
    let salida = await salidaService.buscarTodas();
    res.json(salida).status(200);
};


exports.postCrearSalida = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        return res.status(400).json({ success: false, error: result }); //if routes.js sends error, controller catches and sends error #.
    } 
    
    try {
        let salida = req.body;     //todo lo que viene en el json payload
        let salidaCreada = await salidaService.crearSalida(salida); 
        return res.json(salidaCreada).status(201);
    }
    catch (error) { //En caso de error relacionado a la base de datos, enter here.
        console.error("Error al intentar crear salida: ", error);
        return res.status(500).json({ success: false, message: "Error durante proceso de crear salida" });
    }
};
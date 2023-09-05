const entradaService = require('../services/entrada.service');
const { validationResult } = require('express-validator');

/**
 * Procesa el request POST para guardar una persona
 * @param {Request} req - Request que contiene la informacion de una nueva persona
 * @param {Response} res - Response que en caso exitoso retornara la persona creada con status 201, o regresara error 400 en caso de que una de los datos sea invalida
 */
exports.postCrear = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let entrada = req.body;     //todo lo que viene en el json cargo
        let entradaCreada = await entradaService.crear(entrada);
        res.json(entradaCreada).status(201);
    }    
};

/**
 * Procesa el request GET para obtener todas las entradas
 * @param {Request} req - Request
 * @param {Response} res - Response que contiene una lista de todas las entradas y status 200
 */
exports.getBuscarTodas = async function (req, res) {
    let entrada = await entradaService.buscarTodas();
    res.json(entrada).status(200);
};

exports.getBuscarPorId = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let idEntrada = req.params.id;
        let entrada = await entradaService.buscarPorId(idEntrada);

        if (entrada !== undefined) {
            res.json(entrada).status(200);
        } else {
            res.status(204).json({ success: false });
        }        
    }
};

//UPDATE EXISTING
exports.updateEntrada = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result }); //aqui manda los errores
    } else {
        let entrada = req.body;
        let idEntrada = req.params.id;
        let entradaActualizada = await entradaService.updateEntrada(idEntrada, entrada);

        if (entradaActualizada == true) {
            res.status(200).json({ success: true });
        } else {
            res.status(204).json({ success: false });
        }        

    }    
};

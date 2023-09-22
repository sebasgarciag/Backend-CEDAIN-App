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
        return res.status(400).json({ success: false, error: result }); //if routes.js sends error, controller catches and sends error #.
    } 
    
    try {
        let entrada = req.body;     //todo lo que viene en el json payload
        let entradaCreada = await entradaService.crear(entrada);
        return res.json(entradaCreada).status(201);
    }
    catch (error) { //En caso de error relacionado a la base de datos, enter here.
        console.error("Error al intentar crear entrada: ", error);
        return res.status(500).json({ success: false, message: "Error durante proceso de crear entrada" });
    }
};

exports.postCrearProductos = async function (req, res){
    let result = validationResult(req);
    
    //Do I need this ????
    if (result.errors.length > 0) {
        return res.status(400).json({ success: false, error: result }); //if routes.js sends error, controller catches and sends error #.
    } 

    try {
        let entradaDetalle = req.body;     //todo lo que viene en el json payload, esta aqui.
        let entradaDetalleCreada = await entradaService.crearEntradaDetalle(entradaDetalle);
        return res.json(entradaDetalleCreada).status(201);
    }
    catch (error) { //En caso de error relacionado a la base de datos, enter here.
        console.error("Error al intentar crear entrada: ", error);
        return res.status(500).json({ success: false, message: "Error durante proceso de crear entrada_detalle" });
    }
}

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



exports.getEntradasPorFecha = async function (req, res) {
    const result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let date = req.params.date;
        let entradas = await entradaService.entradasPorFecha(date);

        if (entradas !== undefined) {
            res.json(entradas).status(200);
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

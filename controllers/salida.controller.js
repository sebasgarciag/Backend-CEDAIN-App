const salidaService = require('../services/salida.service');
const { validationResult } = require('express-validator');
const ExcelJS = require('exceljs');
/**
 * Controla el GET de "" o "salidas?date=YYYY-MM-DD"
 *
 * @async
 * @function
 * @param {Object} req - Contiene nada
 * @param {Object} res - Regresa entradas. Todas
 * @returns {Object} JSON con detalles de productos.
 */
exports.getBuscarTodas = async function (req, res) {
    let salida = await salidaService.buscarTodas();
    res.status(200).json(salida);
};

/** 
 * Procesa el request POST para guardar una salida
 * 
 * @param {Request} req.body - Contiene la informacion de una nueva entrada (JSON)
 * @param {Response} res - Response que en caso exitoso retornara la persona creada con status 201, 
 * o regresara error 400 en caso de que una de los datos sea invalida
 * @throws {Error} en caso de error en base de datos
 */
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
/**
 *endpoint para buscar todas las comunidades.
 * 
 * @function
 * @async
 * @param {Object} req - Objeto ninguno
 * @param {Object} res - todas las comunidades
 * @returns {void} Responde con un JSON conteniendo las comunidades y un código de estado 200.
 */
exports.getBuscarTodasComunidades = async function (req, res) {
    let Comunidades = await salidaService.buscarTodasComunidades();
    res.json(Comunidades).status(200);
};


/**
 *endpoint para buscar todas las  evento.
 * 
 * @function
 * @async
 * @param {Object} req - Objeto ninguno
 * @param {Object} res - todas los eventos
 * @returns {void} Responde con un JSON conteniendo los eventos y un código de estado 200.
 */
exports.getBuscarTodosEventos = async function (req, res) {
    let Eventos = await salidaService.buscarTodosEventos();
    res.json(Eventos).status(200);
};

/**
 * Controla la creacion de "salidas-detalles".
 *
 * @async
 * @function
 * @param {Object} req - Contiene los datos enviados en JASON desde routes.
 * @param {Object} res - En caso de una creacion lograda, regresa el objeto con los datos.
 * @returns {Object} JSON con detalles de productos, o mensaje de error.
 * @throws 500 si hay un error en la creacion o en la base de datos.
 */
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

/**
 * Controla el GET de /salida-usuario/:id"
 *
 * @async
 * @function
 * @param {Object} req - id del usuario del cual se quieren ver las salida.
 * @param {Object} res - Regresa entradas.
 * @returns {Object} JSONs de cada entrada hecha por el usuario (id).
 * @throws 500 si hay un error en busqueda.
 */
exports.getSalidasPorUsuario = async function (req, res) {
    let result = validationResult(req);
    
    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let idUsuario = req.params.id;
        let salida = await salidaService.buscarSalidasDeUsuario(idUsuario);

        if (salida !== undefined) {
            res.json(salida).status(200);
        } else {
            res.status(204).json({ success: false });
        }        
    }
};


/**
 * Controla el GET de /salida-detalles/:idSalida
 *
 * @async
 * @function
 * @param {Object} req - Contiene ID de la salida la cual se busca ver los detalles (productos).
 * @param {Object} res - Regresa detalles.
 * @returns {Object} JSON con detalles de productos, o mensaje de error.
 * @throws 500 si hay un error.
 */
exports.getDetallesPorId = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let idSalida = req.params.idSalida;
        let salidaDetalles = await salidaService.detallesPorId(idSalida);

        if (salidaDetalles !== undefined) {
            if (salidaDetalles.length > 0) {
                res.json(salidaDetalles).status(200);
            } else {
                res.status(204).send(); // Send a "no content" response
            }
        } else {
            res.status(204).json({ success: false });
        }        
    }
};
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
exports.putModificarInventario = async function (req, res){
    let result=validationResult(req);

    if (result.errors.length > 0) {
        return res.status(400).json({ success: false, error: result }); //if routes.js sends error, controller catches and sends error #.
    }
    else {
        let inventario = req.body;
        let idproducto= req.params.id;
        let inventarioActualizado = await salidaService.actualizarExistencias(idproducto, inventario);
    
         if ( inventarioActualizado == true) {
              res.status(200).json({ success: true });
        } else {
              res.status(204).json({ success: false });
         }          
    } 

};


exports.getDetallesPorId = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let idSalida = req.params.idSalida;
        let salidaDetalles = await salidaService.detallesPorId(idSalida);

        if (salidaDetalles !== undefined) {
            res.json(salidaDetalles).status(200);
        } else {
            res.status(204).json({ success: false });
        }        
    }
};
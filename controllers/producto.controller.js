const entradaService = require('../services/entrada.service');
const { validationResult } = require('express-validator');


exports.postCrear = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        return res.status(400).json({ success: false, error: result }); //if routes.js sends error, controller catches and sends error #.
    } 
    
    try {
        let producto = req.body;     //todo lo que viene en el json payload
        let productoCreado = await productoService.crear(producto);
        return res.json(productoCreado).status(201);
    }
    catch (error) { //En caso de error relacionado a la base de datos, enter here.
        console.error("Error al intentar crear producto: ", error);
        return res.status(500).json({ success: false, message: "Error durante proceso de crear producto" });
    }
};

/**
 * Procesa el request GET para obtener todas las entradas
 * @param {Request} req - Request
 * @param {Response} res - Response que contiene una lista de todas las entradas y status 200
 */
exports.getBuscarTodas = async function (req, res) {
    let producto = await productoService.buscarTodas();
    res.json(producto).status(200);
};

exports.getBuscarPorId = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let idProducto = req.params.id;
        let producto = await productoService.buscarPorId(idProducto);

        if (producto !== undefined) {
            res.json(pro).status(200);
        } else {
            res.status(204).json({ success: false });
        }        
    }
};




exports.getProductosPorNombre = async function (req, res) {
    const result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let nombre = req.params.nombre; // Cambiar "date" por "nombre" en la obtención del parámetro
        let productos = await productoService.productosPorNombre(nombre); // Llamar a la función "productosPorNombre" en lugar de "entradasPorFecha"

        if (productos.length > 0) { // Cambiar la condición para verificar si se encontraron productos
            res.json(productos).status(200);
        } else {
            res.status(204).json({ success: false });
        }        
    }
};





//UPDATE EXISTING
exports.updateProducto = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result }); //aqui manda los errores
    } else {
        let producto = req.body;
        let idProducto = req.params.id;
        let productoActualizado = await productoService.updateProducto(idProducto, producto);

        if (productoActualizado == true) {
            res.status(200).json({ success: true });
        } else {
            res.status(204).json({ success: false });
        }        

    }    
};
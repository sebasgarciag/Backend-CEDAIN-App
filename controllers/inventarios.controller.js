const inventarioService = require('../services/inventarios.service');
const { validationResult } = require('express-validator');

/**
 * Procesa el request GET para obtener todas las entradas
 * @param {Request} req - Request
 * @param {Response} res - Response que contiene una lista de todas las entradas y status 200
 */
exports.getBuscarTodas = async function (req, res) {
    let inventario = await inventarioService.buscarTodas();
    res.json(inventario).status(200);
};


exports.postCrear = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } 
    else {
        let inventario = req.body; //todo lo que viene en el json cargo
        try{
            let inventarioCreado = await inventarioService.crear(inventario);
            res.json(inventarioCreado).status(201);
        }
        catch{
            res.json({Error:"Datos duplicados"}).status(400)
        }
    }    
};


exports.putProductos = async function (req,res){
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result }); //aqui manda los errores
    } else {
        let inventario = req.body;
        let idInventario = req.params.id;
        let inventarioActualizado = await inventarioService.updateInventario(idInventario,inventario);

        if (inventarioActualizado == true) {
            res.status(200).json({ success: true });
        } else {
            res.status(204).json({ success: false });
        }        

    }    
    
};

//UPDATE EXISTING

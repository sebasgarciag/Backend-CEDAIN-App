const inventarioService = require('../services/inventario.service');
const { validationResult } = require('express-validator');

exports.getBuscarTodosProductos = async function (req, res) {
    
    //if undifined, traer todas. else traete las fechas
    let idAlmacen = req.query.idAlmacen;
    if(idAlmacen == undefined){
        let producto = await inventarioService.buscarTodosProductos();
        res.json(producto).status(200);
    }else{
        let inventarios = await inventarioService.buscarInventarioPorAlmacen(idAlmacen);

        if (inventarios !== undefined && inventarios.length > 0) {
            res.json(inventarios).status(200);
        } else {
            res.status(204).json({ success: false });
        } 
    }
};

exports.getBuscarPorAlmacen = async function (req, res) {

    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let idAlmacen = req.params.id;
        let inventarios = await inventarioService.buscarInventarioPorAlmacen(idAlmacen);

        if (inventarios !== undefined && inventarios.length > 0) {
            res.json(inventarios).status(200);
        } else {
            res.status(204).json({ success: false });
        }        
    }
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

exports.putModificarInventario = async function (req,res){
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

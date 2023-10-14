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

exports.putModificarInventario = async function (req, res){
    let result = validationResult(req);

    if (result.errors.length > 0) {
        return res.status(400).json({ success: false, error: result });
    } else {
        const inventario = req.body; // Puede ser un objeto o un arreglo de objetos.

        if (Array.isArray(inventario)) {
            // Si inventario es un arreglo de objetos, procesa cada producto por separado.
            for (const producto of inventario) {
                const idProducto = producto.id_producto;
                const idAlmacen = producto.id_almacen;

                const inventarioModificado = await inventarioService.actualizarExistencias(producto, idProducto, idAlmacen);

                if (inventarioModificado == false) {
                    return res.status(204).json({ success: false });
                }
            }

            // Si todos los productos se actualizaron correctamente, envía una respuesta exitosa.
            res.status(200).json({ success: true });
        } else {
            // Si inventario es un solo objeto, procesa ese producto.
            const idProducto = inventario.id_producto;
            const idAlmacen = inventario.id_almacen;

            const inventarioModificado = await inventarioService.actualizarExistencias(inventario, idProducto, idAlmacen);

            if (inventarioModificado == true) {
                res.status(200).json({ success: true });
            } else {
                res.status(204).json({ success: false });
            }
        }
    }
};

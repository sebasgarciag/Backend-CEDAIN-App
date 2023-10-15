const productoService = require('../services/producto.service');
const { validationResult } = require('express-validator');


exports.postCrear = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        return res.status(400).json({ success: false, error: result }); //if routes.js sends error, controller catches and sends error #.
    }
    
    try {
        const productoData = req.body;
        console.log('productoData')
        // Add the image buffer if it's provided
        if (req.file) {
            productoData.imagen = req.file.buffer;
        }
        console.log('req.file')
        let productoCreado = await productoService.crear(productoData);
        console.log('await')
        return res.json(productoCreado).status(201);
    }
    catch (error) { //En caso de error relacionado a la base de datos, enter here.
        console.error("Error al intentar crear productooo: ", error);
        return res.status(500).json({ success: false, message: "Error durante proceso de crear producto" });
    }
};

//UPDATE EXISTING
exports.updateProducto = async function (req, res) {
    let result = validationResult(req);
    
    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result }); //aqui manda los errores
    } else {
        try {
            const productoData = req.body;
            const idProducto = req.params.id;
            
            if (req.file) {
                productoData.imagen = req.file.buffer;
                console.log('sí viene imagen')
            }
            
            let productoActualizado = await productoService.updateProducto(idProducto, productoData);
            
            if (productoActualizado == true) {
                res.status(200).json({ success: true });
            } else {
                res.status(204).json({ success: false });
            }        
        }
        catch (error) { //En caso de error relacionado a la base de datos, enter here.
            console.error("Error al intentar editar productooo: ", error);
            res.status(500).json({ success: false, message: "Error durante proceso de editar producto" });
        }
        
    }    
};

//UPDATE EXISTING
exports.getProductImage = async function (req, res) {
    try {
        const idProducto = req.params.id;
        const producto = await productoService.buscarPorId(idProducto);
  
        if (!producto || !producto.imagen) {
            res.status(404).send({ success: false, message: 'Image not found!' });
            return;
        }
  
        // Assuming the image is stored as JPEG
        res.set('Content-Type', 'image/jpeg');
        res.send(producto.imagen);
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
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
            res.json(producto).status(200);
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







exports.getCategorias = async function (req, res) {
    let categorias = await productoService.buscarCategorias();
    if (!categorias){
        res.status(204).json({ success: false });
    }
    else{
        res.status(200).json(categorias);
    }
};

exports.getTamanios = async function (req, res) {
    let tamanios = await productoService.buscarTamanios();
    if (!tamanios){
        res.status(204).json({ success: false });
    }
    else{
        res.status(200).json(tamanios);
    }
};

exports.suspenderProductos = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result.array() }); //aqui manda los errores
    } else {
        let idProducto = req.params.id;
        let estado = (req.params.state === 'true') ? 1 : 0; // convierte el estado a 1 o 0
        let productoActualizado = await productoService.suspenderProducto(idProducto, estado);

        if (productoActualizado && productoActualizado.suspendido == estado) {
            res.status(200).json({ success: true, producto: productoActualizado });
        } else {
            res.status(204).json({ success: false });
        }
    }
}


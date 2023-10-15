const productoService = require('../services/producto.service');
const { validationResult } = require('express-validator');

/**
 * Crea un nuevo producto.
 * @param {object} req - Contiene la informacion de un nuevo producto (JSON).
 * @param {object} res - Regresa el producto creado.
 */
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
        return res.status(201).json(productoCreado);
    }
    catch (error) { //En caso de error relacionado a la base de datos, enter here.
        console.error("Error al intentar crear productooo: ", error);
        return res.status(500).json({ success: false, message: "Error durante proceso de crear producto" });
    }
};

/**
 * Actualiza un producto existente.
 * @param {object} req - Contiene la informacion a actualizar de un producto (JSON) y su id.
 * @param {object} res - Regresa si fue exitoso o no.
 */
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

/**
 * Obtiene la imagen de un producto por su ID.
 * @param {object} req - Contiene el id del producto del cual se obtendrá su imagen.
 * @param {object} res - Regresa la imagen del producto.
 */
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
 * Obtiene todos los productos.
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Regresa la lista de todos los productos existentes
 */
exports.getBuscarTodas = async function (req, res) {
    let producto = await productoService.buscarTodas();
    res.json(producto).status(200);
};

/**
 * Obtiene un producto por su ID.
 * @param {object} req - Contiene le id del producto a obtener.
 * @param {object} res - Regresa el producto
 */
exports.getBuscarPorId = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let idProducto = req.params.id;
        let producto = await productoService.buscarPorId(idProducto);

        if (producto != null) {
            res.status(200).json(producto);
        } else {
            res.status(204).json({ success: false });
        }        
    }
};

/**
 * Obtiene productos por su nombre.
 * @param {object} req - Contiene el nombre por el que se buscarán los objetos.
 * @param {object} res - Regresa lista de productos
 */
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

/**
 * Obtiene todas las categorías de productos.
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Regresa la lista de categorías existentes
 */
exports.getCategorias = async function (req, res) {
    let categorias = await productoService.buscarCategorias();
    if (!categorias){
        res.status(204).json({ success: false });
    }
    else{
        res.status(200).json(categorias);
    }
};

/**
 * Obtiene todos los tamaños de productos.
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Regresa la lista de tamaños existentes
 */
exports.getTamanios = async function (req, res) {
    let tamanios = await productoService.buscarTamanios();
    if (!tamanios){
        res.status(204).json({ success: false });
    }
    else{
        res.status(200).json(tamanios);
    }
};

/**
 * Suspende o reactiva un producto por su ID.
 * @param {object} req - Contiene el id del producto a suspender o reactivar
 * @param {object} res - Regresa si fue exitoso
 */
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


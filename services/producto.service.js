const { Op } = require('sequelize');
const db = require('../models');

/**
 * Busca y devuelve todos los productos en la base de datos, incluyendo información
 * de otras tablas asociadas, como 'Tamaño' y 'Categoría'.
 *
 * @async
 * @function
 * @returns {Promise<Array>} - Un array que contiene todos los productos.
 * @throws {Error} - Lanza un error si la obtención de la base de datos falla.
 */
exports.buscarTodas = async function() { // RETURNS ALL
    let productos = await db.Producto.findAll({ include: [
        db.Tamanio, 
        db.Categoria,  
    ]});
    return productos;
}

/**
 * Busca y devuelve todas las categorías en la base de datos.
 *
 * @async
 * @function
 * @returns {<Array>} - Un array con todas las categorías.
 * @throws {Error} - Lanza un error si la obtención de la base de datos falla.
 */
exports.buscarCategorias = async function() { // RETURNS ALL CATEGORIAS 
    let categorias = null
    try{
        categorias = await db.Categoria.findAll();
    }
    catch{
        // 
    }
    return categorias;
}

/**
 * Busca y devuelve todos los tamaños en la base de datos.
 *
 * @async
 * @function
 * @returns {<Array>} - Un array con todos los tamaños.
 * @throws {Error} - Lanza un error si la obtención de la base de datos falla.
 */
exports.buscarTamanios = async function() { // RETURNS ALL CATEGORIAS 
    let tamanios = null
    try{
        tamanios = await db.Tamanio.findAll();
    }
    catch{
        //
    }
    return tamanios;
}

/**
 * Busca y devuelve un producto según el ID proporcionado.
 *
 * @async
 * @function
 * @param {number} idProducto - El ID del producto que se desea buscar en la base de datos.
 * @returns {Object} - El producto que se está buscando.
 * @throws {Error} - Lanza un error si la obtención de la base de datos falla.
 */
exports.buscarPorId = async function(idProducto) { //RETURNS ENTRY INFO FROM THE ID GIVEN ONLY
    let producto = null;
    try{
        producto = await db.Producto.findByPk(idProducto);
    }
    catch{
        // 
    }

    return producto;
}

/**
 * Busca y devuelve todos los productos cuyos nombres contienen el valor proporcionado.
 *
 * @async
 * @function
 * @param {string} nombre - El valor a buscar en el nombre de los productos.
 * @returns {<Array>} - Un array con productos que coinciden con el nombre.
 * @throws {Error} - Lanza un error si la obtención de la base de datos falla.
 */
exports.productosPorNombre = async function(nombre) { //RETURNS ALL PRODUCTS BY NAME

    // Utiliza el operador [Op.iLike] para buscar de manera insensible a mayúsculas y minúsculas
    let productos = await db.Producto.findAll({
        where: {
            nombre: {
                [Op.iLike]: `%${nombre}%` // Busca el nombre que contiene el valor proporcionado
            }
        }
    });

    return productos;
}

/**
 * Crea un nuevo producto en la base de datos después de realizar varias comprobaciones de validación.
 *
 * @async
 * @function
 * @param {Object} producto - Contiene toda la información necesaria para crear un nuevo producto.
 * @returns {Object} - Devuelve el objeto del producto creado.
 * @throws {Error} - Lanza un error si alguna validación falla u ocurre otro error.
 */
exports.crear = async function(producto) {   //CREATES NEW ENTRADA. RECEIVES ALL THE REQUIRED DATA INSIDE THE OBJECT COUGHT BY THE FUNCTION. (entrada)
        
    try {
        let nuevaProducto = await db.Producto.create(producto);
        console.log("Nuevo producto agregado " + nuevaProducto.id_producto);
        return nuevaProducto;
    }
    catch (error) {
        console.error("Error en producto.service.js: ", error); // <------------ ??? no sale
        throw new Error("Error en producto.service.js; CHECK YOUR TERMINAL!\nProbablemente necesites informacion de una tabla que esta vacia.");
    }
}

/**
 * Actualiza un producto existente en la base de datos.
 *
 * @async
 * @function
 * @param {number} idProducto - El ID del producto que se desea actualizar.
 * @param {Object} producto - Datos del producto actualizado.
 * @returns {boolean} - Devuelve true si el producto se actualizó correctamente.
 */
exports.updateProducto = async function(idProducto, producto) {
    let productoActualizado = false;

    productoActualizado = await db.Producto.findByPk(idProducto)
    console.log("IM HERE UPDATE PRODUCTO.SERVICE")
    if (productoActualizado !== null) {
        const result = await db.Producto.update(producto, {
            where: {
              id_producto: idProducto,
            },
          });

        productoActualizado = true; //success
    }

    return productoActualizado;
}

/**
 * Suspende o reactiva un producto en función del estado proporcionado.
 *
 * @async
 * @function
 * @param {number} idProducto - El ID del producto que se desea suspender o reactivar.
 * @param {boolean} estado - Un valor booleano que indica si se debe suspender (true) o reactivar (false) el producto.
 * @returns {Object|null} - Devuelve el producto actualizado o null si el producto no se encuentra.
 */
exports.suspenderProducto = async function (idProducto, estado) {
    let productoActualizado = await db.Producto.findByPk(idProducto);
    if (productoActualizado) {
        productoActualizado.suspendido = estado;
        await productoActualizado.save();
        return productoActualizado;
    } else {
        console.log('Producto no encontrado');
        return null;
    }
}





const { Op } = require('sequelize');
const dbConfig = require('../config/db.config');
const db = require('../models');

exports.buscarTodas = async function() { // RETURNS ALL
    productos = await db.Producto.findAll();
    return productos;
}



exports.buscarCategorias = async function() { // RETURNS ALL CATEGORIAS 
    categorias = await db.Categoria.findAll();
    return categorias;
}


exports.buscarPorId = async function(idProducto) { //RETURNS ENTRY INFO FROM THE ID GIVEN ONLY
    let producto = undefined;

    producto = await db.Producto.findByPk(idProducto);
    // console.log(idProducto)

    return producto;
}

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







exports.crear = async function(producto) {   //CREATES NEW ENTRADA. RECEIVES ALL THE REQUIRED DATA INSIDE THE OBJECT COUGHT BY THE FUNCTION. (entrada)
        
    // A) check if received values exist on the db

        //check if 'id_comunidad' existe
/*     const comCheck = await db.Tamaño.findByPk(producto.id_tamaño);
    
    if (!comCheck) {
        throw new Error("El id_tamaño #" + producto.id_tamaño + "(or 0) NO EXISTE en la BD!");
    } */

       
    

    

        //Checks for errors. if not, create entrada.
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





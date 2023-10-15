const { Op } = require('sequelize');
const dbConfig = require('../config/db.config');
const db = require('../models');



exports.buscarTodas = async function() { // RETURNS ALL
    inventario = await db.Inventario.findAll();
    return inventario;
}

// Crear inventario con producto
exports.crear = async function(inventario) { // RETURNS ALL

    nuevoInventario = await db.Inventario.create(inventario)

    console.log("Inventario - producto creado")
    return nuevoInventario;
}


exports.updateInventario = async function(idInventario,nuevaCantidad) { //This one will only update parameters given.
    let inventarioActualizado = false;

    const existingInventario = await db.Inventario.findByPk(idInventario)

    if (existingInventario !== null) {
        await db.Inventario.update(
            {
                cantidad:nuevaCantidad
            },  // Pass the entrada object directly
            {
                where: {
                    id_inventario: idInventario
                }
            }
        );

        inventarioActualizado = true; //success
    }

    return inventarioActualizado;
};

exports.buscarTodosProductos = async function() { // RETURNS ALL
    entradas = await db.Producto.findAll();
    return entradas;
}


exports.buscarInventarioPorAlmacen = async function(idAlmacen) { 
    let inventarios = undefined;

    // Busca todos los registros en la tabla 'inventarios' que tengan el 'id_almacen' especificado
    inventarios = await db.Inventario.findAll({
        where: {
            id_almacen: idAlmacen
        },
        include: [{
            model: db.Producto,
            required: true,
            include: db.Tamanio
        }]
    });

    return inventarios;
}


exports.actualizarExistencias = async function(inventario, idProducto, idAlmacen) {   
    let inventarioActualizado = false;

    inventarioActualizado = await db.Inventario.findOne({
        where: {
            id_producto: idProducto,
            id_almacen: idAlmacen
        }
    })


    if (inventarioActualizado !== null) {
        const nuevaCantidad = inventarioActualizado.cantidad + inventario.cantidad ;

        const result = await db.Inventario.update(
            {
                cantidad: nuevaCantidad
                
            },
            {
                where: {
                    id_producto: idProducto,
                    id_almacen: idAlmacen
                }
            }
        );
        
        inventarioActualizado = true;
    }
    return inventarioActualizado;
}


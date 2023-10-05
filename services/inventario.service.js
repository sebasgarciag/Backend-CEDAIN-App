const { Op } = require('sequelize');
const dbConfig = require('../config/db.config');
const db = require('../models');



exports.buscarTodas = async function() { // RETURNS ALL
    inventario = await db.Inventarios.findAll();
    return inventario;
}

// Crear inventario con producto
exports.crear = async function(inventario) { // RETURNS ALL

    nuevoInventario = await db.Inventarios.create(inventario)

    console.log("Inventario - producto creado")
    return nuevoInventario;
}


exports.updateInventario = async function(idInventario,inventario) { //This one will only update parameters given.
    let inventarioActualizado = false;

    const existingInventario = await db.Inventarios.findByPk(idInventario)

    if (existingInventario !== null) {
        await db.Inventario.update(
            inventario,  // Pass the entrada object directly
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
    entradas = await db.Productos.findAll();
    return entradas;
}


exports.buscarInventarioPorAlmacen = async function(idAlmacen) { 
    let inventarios = undefined;

    // Busca todos los registros en la tabla 'inventarios' que tengan el 'id_almacen' especificado
    inventarios = await db.Inventarios.findAll({
        where: {
            id_almacen: idAlmacen
        },
        include: [{
            model: db.Productos,
            as: 'Producto',
            required: true
        }]
    });

    return inventarios;
}



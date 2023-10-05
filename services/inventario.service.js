const { Op } = require('sequelize');
const dbConfig = require('../config/db.config');
const db = require('../models');

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


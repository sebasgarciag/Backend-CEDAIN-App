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


exports.updateInventario = async function(idInventario,inventario) { //This one will only update parameters given.
    let inventarioActualizado = false;

    const existingInventario = await db.Inventario.findByPk(idInventario)

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




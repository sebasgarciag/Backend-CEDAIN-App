const db = require('../models');

exports.buscarTodas = async function() { // RETURNS ALL
    entradas = await db.Entrada.findAll();
    return entradas;
}

exports.buscarPorId = async function(idEntrada) { //RETURNS INFO FROM THE ID GIVEN ONLY
    let entrada = undefined;

    entradas = await db.Entrada.findAll({ //entre todas, busca la que tenga idEntrada igual
        where: {
            id_entrada: idEntrada
        }
    });

    if (entradas.length > 0) {
        entrada = entradas[0];
    }

    return entrada;
}

exports.crear = async function(entrada) {   //CREATES NEW ENTRADA. RECEIVES ALL THE REQUIRED DATA INSIDE THE OBJECT COUGHT BY THE FUNCTION. (entrada)
    nuevaEntrada = await db.Entrada.create(entrada);
    console.log("Nueva entrada agregada " + nuevaEntrada.id_entrada);
    return nuevaEntrada;
}

// exports.updateEntrada = async function(idEntrada, entrada) {
//     let entradaActualizada = false;

//     entradaActualizada = await db.Entrada.findByPk(idEntrada)

//     if (entradaActualizada !== null) {
//         const result = await db.Entrada.update(
//             {
//                 fecha: entrada.fecha,
//                 folio: entrada.folio,
//                 serie: entrada.serie,
//                 observaciones: entrada.observaciones,
//                 id_usuario: entrada.id_usuario,
//                 id_almacen: entrada.id_almacen,
//                 emisor: entrada.emisor,
//                 id_comunidad: entrada.id_comunidad,
//                 id_evento: entrada.id_evento
//             },
//             {
//                 where: {
//                     id_entrada: idEntrada
//                 }
//             }
//         );

//         entradaActualizada = true; //success
//     }

//     return entradaActualizada;
// }


exports.updateEntrada = async function(idEntrada, entrada) { //This one will only update parameters given.
    let entradaActualizada = false;

    const existingEntrada = await db.Entrada.findByPk(idEntrada)

    if (existingEntrada !== null) {
        await db.Entrada.update(
            entrada,  // Pass the entrada object directly
            {
                where: {
                    id_entrada: idEntrada
                }
            }
        );

        entradaActualizada = true; //success
    }

    return entradaActualizada;
};



// You're correct. The current implementation of updateEntrada expects all fields to be provided in the entrada object. If you only send a subset of fields, the other fields will be set to undefined, which is not what you want.
// To handle partial updates, you can simply pass the entrada object directly to the update method. This way, only the fields provided in entrada will be updated, and fields not provided will remain unchanged.
// Here's how you can modify the updateEntrada function to handle partial updates: SEE updateEntrada
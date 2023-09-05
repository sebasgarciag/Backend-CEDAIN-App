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




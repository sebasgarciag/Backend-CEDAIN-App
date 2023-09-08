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
    //first, check if received values exist on the db
    //check if 'id_comunidad' existe
    comCheck = await db.Comunidad.findByPk(entrada.id_comunidad);
    
    if (!comCheck) {
        throw new Error("El id_comunidad #" + entrada.id_comunidad + "(or 0) NO EXISTE en la BD <=======!!");
    }

    //check if 'id_evento' exists
    //no hay una columna que se llame 'descripcion'
    eveCheck = await db.Evento.findByPk(entrada.id_evento);
    if (!eveCheck) {
        throw new Error("El id_evento #" + entrada.id_evento + " (or 0) NO EXISTE en la BD <=======!!");
    }

    //check if 'id_usuario' exists
    usuCheck = await db.Usuario.findByPk(entrada.id_usuario);
    if (!usuCheck) {
        throw new Error("El id_usuario #" + entrada.id_usuario + " (or 0) NO EXISTE en la BD <=======!!");
    }
    
    
    try {
        nuevaEntrada = await db.Entrada.create(entrada);
        console.log("Nueva entrada agregada " + nuevaEntrada.id_entrada);
        return nuevaEntrada;
    }
    catch (error) {
        console.error("Error en entrada.service.js: ", error); // <------------ ??? no sale
        throw new Error("Error en entrada.service.js; CHECK YOUR TERMINAL!\nProbablemente necesites informacion de una tabla que esta vacia.");
    }
}

exports.updateEntrada = async function(idEntrada, entrada) {
    let entradaActualizada = false;

    entradaActualizada = await db.Entrada.findByPk(idEntrada)
    console.log("IM HERE UPDATE ENTRADA.SERVICE")
    if (entradaActualizada !== null) {
        const result = await db.Entrada.update(
            {
                fecha: entrada.fecha,
                folio: entrada.folio,
                serie: entrada.serie,
                observaciones: entrada.observaciones,
                id_usuario: entrada.id_usuario,
                id_almacen: entrada.id_almacen,
                emisor: entrada.emisor,
                id_comunidad: entrada.id_comunidad,
                id_evento: entrada.id_evento
            },
            {
                where: {
                    id_entrada: idEntrada
                }
            }
        );

        entradaActualizada = true; //success
    }

    return entradaActualizada;
}


// exports.updateEntrada = async function(idEntrada, entrada) { //This one will only update parameters given.
//     let entradaActualizada = false;

//     const existingEntrada = await db.Entrada.findByPk(idEntrada)

//     if (existingEntrada !== null) {
//         await db.Entrada.update(
//             entrada,  // Pass the entrada object directly
//             {
//                 where: {
//                     id_entrada: idEntrada
//                 }
//             }
//         );

//         entradaActualizada = true; //success
//     }

//     return entradaActualizada;
// };




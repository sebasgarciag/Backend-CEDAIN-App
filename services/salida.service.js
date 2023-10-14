const db = require('../models');
const { Op } = require('sequelize');
const dbConfig = require('../config/db.config');
/**
 * Regresa todas las salidas en la base de datos, incluso informacion de otras tablas fuera de 'entradas'
 * como 'comunidad', 'almacen' y 'evento' pues estan asociadas.
 * 
 * @async
 * @function
 * @returns {Promise<Array>} en forma de array, te regresa todas las salidas.
 * @throws {Error} Throws an error if retrieval from the database fails.
 */
exports.buscarTodas = async function() { // RETURNS ALL
    salidas = await db.Salida.findAll({ include: [
        {   
            model: db.Usuario,
            attributes: ['nombre', 'apellido_paterno']
        }, 
        db.Almacen, 
        db.Evento
    ]});
    return salidas;
}
/**
 * 
 * @async
 * @function
 * @param {Object} salida - Contiene toda la info necesitada para hacer una salida nueva.
 * @returns {Object} Regresa un objeto con todos los datos de la entrada creada.
 * @throws {Error} Error si es que alguna validacion falla u otro error.
 */
exports.crearSalida = async function(salida) {   //CREATES NEW SALIDA. RECEIVES ALL THE REQUIRED DATA INSIDE THE OBJECT COUGHT BY THE FUNCTION. (salida)
    console.log("salida:",salida);
    
    // A) check if received values exist on the db


        //check if 'id_evento' exists
    const eveCheck = await db.Evento.findByPk(salida.id_evento);
    if (!eveCheck) {
        throw new Error("El id_evento #" + salida.id_evento + " (or 0) NO EXISTE en la BD!");
    }

        //check if 'id_usuario' exists
    const usuCheck = await db.Usuario.findByPk(salida.id_usuario);
    if (!usuCheck) {
        throw new Error("El id_usuario #" + salida.id_usuario + " (or 0) NO EXISTE en la BD!");
    }
    
        //check if 'id_almacen' exists
    const almCheck = await db.Almacen.findByPk(salida.id_almacen);
    if (!almCheck) {
        throw new Error("El id_almacen #" + salida.id_almacen + " (or 0) NO EXISTE en la BD!");
    }
    

    //B) get the last folio value from database, increase it by 1; this is the new folio value for the new exit.
    salida.folio = await checkFolio(db);


        //Checks for errors. if not, create salida.
    try {
        nuevaSalida = await db.Salida.create(salida);
        console.log("Nueva salida agregada " + nuevaSalida.id_salida);
        return nuevaSalida;
    }
    catch (error) {
        console.error("Error en salida.service.js: ", error);
        throw new Error("Error en salida.service.js; CHECK YOUR TERMINAL!\nProbablemente necesites informacion de una tabla que esta vacia.");
    }
}
/**
 * @async
 * @function
 * @param {number} idSalida - ID de salida la cual se buscan los detalles.
 * @returns {<Array>} Array con los detalles de entrada.
 * @throws {Error} Error si es que falla el proceso.
 */
exports.detallesPorId = async function(idSalida) { //RETURNS INFO FROM THE ID GIVEN ONLY
    let salidaDetalles;

    salidaDetalles = await db.SalidaDetalle.findAll({ //entre todas, busca la que tenga idEntrada igual
        where: {
            id_salida: idSalida
        },
        include: {
            model: db.Producto, 
            attributes: ['nombre'],
            include: db.Tamanio
        }
    });

    // if (salidaDetalles.length > 0) {
    //     salidaDetalles = salidaDetalles[0];
    // }

    return salidaDetalles;
};

/**
 * @async
 * @function
 * @param {Array} salidaDetalle - recibe un array de todos los objetos en salida, cada objeto tiene
 * la informacion de entrada-detalle (producto en entrada: id_entrada_detalle, id_entrada, id_producto, cantidad, precio_unitario).
 * @returns {Arra>} Array con objetos (detalles de arriba).
 * @throws {Error} Error si es que alguna validacion falla u otro error.
 */
exports.crearSalidaDetalle = async function(salidaDetalle){

    nuevosDetallesSalida = await db.SalidaDetalle.bulkCreate(salidaDetalle);
    return nuevosDetallesSalida;

}

/**
 * @async
 * @function
 * @param {number} idUsuario - ID del usuario el cual se quieren ver las salidas que hiso.
 * @returns {<Array>} Array con las entradas hechas por el usuario.
 * @throws {Error} Error si es que falla el proceso.
 */
//RETURNS all salidas from given user_id
exports.buscarSalidasDeUsuario = async function(idUsuario) {
    let salida = undefined;

    salidas = await db.Salida.findAll({ //entre todas, busca la que tenga idEntrada igual
        where: {
            id_usuario: idUsuario
        }, 
        include: [
            db.Almacen, 
            db.Evento
        ]
    });

    if (salidas.length > 0) {
        salida = salidas;
    }

    return salida;

}

async function checkFolio(db) {

    //gets last Folio from salidas tabble. To do so, it must be sorted in descending order.
    //order: [[column 'folio' in 'descending' order]]
const lastFolio = await db.Salida.findOne({
    order: [['folio', 'DESC']]
});

    // If there's a last entry, increment its folio value by 1, otherwise start from 1
return lastFolio ? lastFolio.folio + 1 : 1;

//above is the same as:
// let result;
// if (lastFolio) {
//     result = lastFolio.folio + 1;
// } else {
//     result = 1;
// }

}

/**
 * Busca y retorna todas las comunidades de la base de datos.
 * 
 * @function
 * @async
 * @returns {Promise<Array>} Una promesa que resuelve a un arreglo de comunidades.
 * @throws {Error} Lanza un error si hay problemas al consultar la base de datos.
 * @example
 * const comunidades = await buscarTodasComunidades();
 */
exports.buscarTodasComunidades = async function() { 
    comunidades = await db.Comunidad.findAll();
    return comunidades;
}

/**
 * Busca y retorna todos los eventos de la base de datos.
 * 
 * @function
 * @async
 * @returns {Promise<Array>} Una promesa que resuelve a un arreglo de eventos.
 * @throws {Error} Lanza un error si hay problemas al consultar la base de datos.
 * @example
 * const eventos = await buscarTodosEventos();
 */
exports.buscarTodosEventos = async function() { 
    eventos = await db.Evento.findAll();
    return eventos;
}

exports.buscarPorId = async function(idSalida) { 
    let salida = undefined;

    // Buscar salidas que coincidan con el idSalida proporcionado
    let salidas = await db.Salida.findAll({
        where: {
            id_salida: idSalida
        },
        include: [
            {
                model: db.Usuario,
                attributes: ['nombre', 'apellido_paterno']
            },
            db.Almacen,
            db.Evento
        ]
    });

    // Si se encontraron salidas que coinciden, tomar la primera
    if (salidas.length > 0) {
        salida = salidas[0];
    }

    return salida;
}


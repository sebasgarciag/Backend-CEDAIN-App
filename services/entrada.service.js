const { Op } = require('sequelize');
const dbConfig = require('../config/db.config');
const db = require('../models');


/**
 * Regresa todas las entradas en la base de datos, incluso informacion de otras tablas fuera de 'entradas'
 * como 'comunidad', 'almacen' y 'evento' pues estan asociadas.
 * 
 * @async
 * @function
 * @returns {Promise<Array>} en forma de array, te regresa todas las entrdas.
 * @throws {Error} Throws an error if retrieval from the database fails.
 */
exports.buscarTodas = async function() { // RETURNS ALL
    entradas = await db.Entrada.findAll({ include: [
        db.Comunidad, 
        {   
            model: db.Usuario,
            attributes: ['nombre', 'apellido_paterno']
        }, 
        db.Almacen, 
        db.Evento
    ]});
    return entradas;
}


/**
 * Regresa una entrada segun el ID dado, incluyendo informacion de las tablas las cuales
 * estan asociadas a esta: 'Comunidad', 'Almacen' y 'Evento'.
 *
 * @async
 * @function
 * @param {number} idEntrada - El ID de la entrada que queremos buscar en base de datos.
 * @returns {Object} La entrada la cual se esta buscando.
 * @throws {Error} Error si es que falla el proceso.
 */
exports.buscarPorId = async function(idEntrada) { //RETURNS ENTRY INFO FROM THE ID GIVEN ONLY
    let entrada = undefined;

    entradas = await db.Entrada.findAll({ //entre todas, busca la que tenga idEntrada igual
        where: {
            id_entrada: idEntrada
        }, 
        include: [
            db.Comunidad, 
            {   model: db.Usuario,
                attributes: ['nombre', 'apellido_paterno']
            }, 
            db.Almacen, 
            db.Evento
        ]
    });

    if (entradas.length > 0) {
        entrada = entradas[0];
    }

    return entrada;
}


/**
 * Regresa entradas hechas por el usuario (ID de usuario enviado) incluyendo informacion de las tablas las cuales
 * estan asociadas a esta: 'Comunidad', 'Almacen' y 'Evento'
 *
 * @async
 * @function
 * @param {number} idUsuario - ID del usuario el cual se quieren ver las entradas que hiso.
 * @returns {<Array>} Array con las entradas hechas por el usuario.
 * @throws {Error} Error si es que falla el proceso.
 */
exports.buscarEntradasDeUsuario = async function(idUsuario) { //RETURNS ENTRY INFO FROM THE USER ID GIVEN
    let entrada = undefined;

    entradas = await db.Entrada.findAll({ //entre todas, busca la que tenga idEntrada igual
        where: {
            id_usuario: idUsuario
        }, 
        include: [
            db.Comunidad,
            db.Almacen, 
            db.Evento
        ]
    });

    if (entradas.length > 0) {
        entrada = entradas;
    }

    return entrada;
}


/**
 * Regresa detalles de la entrada (ID) enviada, incluyendo informacion de las tablas las cuales
 * estan asociadas a esta: 'producto' y 'tamanios'.
 *
 * @async
 * @function
 * @param {number} idEntrada - ID de entrada la cual se buscan los detalles (productos).
 * @returns {<Array>} Array con los detalles de entrada.
 * @throws {Error} Error si es que falla el proceso.
 */
exports.detallesPorId = async function(idEntrada) { //RETURNS INFO FROM THE ID GIVEN ONLY
    let entradaDetalles;

    entradaDetalles = await db.EntradaDetalles.findAll({ //entre todas, busca la que tenga idEntrada igual
        where: {
            id_entrada: idEntrada
        },
        include: {
            model: db.Producto, 
            attributes: ['nombre'],
            include: db.Tamanio
        }
    });

    return entradaDetalles;
};


/**
 * Regresa entradas creadas dentro de la fecha enviada en (date).
 *
 * @async
 * @function
 * @param {number} date - Fecha en la cual se buscan las entradas.
 * @returns {<Array>} Array con todas las entradas de dicha fecha.
 * @throws {Error} Error si es que falla el proceso.
 */
exports.entradasPorFecha = async function(date) { //RETURNS ALL ENTRIES ON GIVEN DATE (YYYY-MM-DD)

    let desde = new Date(date);
    let hasta = new Date(date);
    hasta.setDate(hasta.getDate() + 1);

    console.log("============================================");
    console.log("Desde:", desde, "Hasta:", hasta);
    console.log("============================================");

    let entradas = await db.Entrada.findAll({
        where: {
            fecha: { //note: this makes the endpoint return the date written by user (if the user is capable) and not by sequelize's 'createdAt'
                [Op.gte]: desde, //.gte equals to  >= x
                [Op.lt]: hasta     //.lt equals to < x
            }
        }
    });

    return entradas;

}


/**
 * Create a new entry (Entrada) in the database after performing several validation checks.
 * Crear una entrada, pero antes hace una serie de validaciones como: el id de comunidad
 * enviado en el JSON existe? etc.
 * 
 * @async
 * @function
 * @param {Object} entrada - Contiene toda la info necesitada para hacer una entrada nueva.
 * @returns {Object} Regresa un objeto con todos los datos de la entrada creada.
 * @throws {Error} Error si es que alguna validacion falla u otro error.
 */

exports.crear = async function(entrada) {   //CREATES NEW ENTRADA. RECEIVES ALL THE REQUIRED DATA INSIDE THE OBJECT COUGHT BY THE FUNCTION. (entrada)
        
    // A) check if received values exist on the db

        //check if 'id_comunidad' existe
    const comCheck = await db.Comunidad.findByPk(entrada.id_comunidad);
    
    if (!comCheck) {
        throw new Error("El id_comunidad #" + entrada.id_comunidad + "(or 0) NO EXISTE en la BD!");
    }

        //check if 'id_evento' exists
    const eveCheck = await db.Evento.findByPk(entrada.id_evento);
    if (!eveCheck) {
        throw new Error("El id_evento #" + entrada.id_evento + " (or 0) NO EXISTE en la BD!");
    }

        //check if 'id_usuario' exists
    const usuCheck = await db.Usuario.findByPk(entrada.id_usuario);
    if (!usuCheck) {
        throw new Error("El id_usuario #" + entrada.id_usuario + " (or 0) NO EXISTE en la BD!");
    }
    
        //check if 'id_almacen' exists
    const almCheck = await db.Almacen.findByPk(entrada.id_almacen);
    if (!almCheck) {
        throw new Error("El id_almacen #" + entrada.id_almacen + " (or 0) NO EXISTE en la BD!");
    }
    

    //B) get the last folio value from database, increase it by 1; this is the new folio value for the new entry.
    entrada.folio = await checkFolio(db);


        //Checks for errors. if not, create entrada.
    try {
        nuevaEntrada = await db.Entrada.create(entrada);
        console.log("Nueva entrada agregada " + nuevaEntrada.id_entrada);
        return nuevaEntrada;
    }
    catch (error) {
        console.error("Error en entrada.service.js: ", error);
        throw new Error("Error al crear entrada: Possible Foreign Key Constraint.");
    }
}


/**
 * Bulkcreate quiere decir que el proceso de insertar informacion en las tablas con los detalles (productos)
 * de una entrada, se hace varias veces.. una vez por cada producto en la entrada, hasta haber insertado
 * en entradas-detalles toda la informacion de cada uno de los productos.
 *
 * @async
 * @function
 * @param {Array} entradaDetalle - recibe un array de todos los objetos en entrada, cada objeto tiene
 * la informacion de entrada-detalle (producto en entrada: id_entrada_detalle, id_entrada, id_producto, cantidad, precio_unitario).
 * @returns {Arra>} Array con objetos (detalles de arriba).
 * @throws {Error} Error si es que alguna validacion falla u otro error.
 */

exports.crearEntradaDetalle = async function(entradaDetalle){

    //Keeps the server from crashing if, for example, a foreign key constraint is found.
    try{
        let nuevosDetalles = await db.EntradaDetalles.bulkCreate(entradaDetalle);
        return nuevosDetalles;
    }
    catch (error) {
        console.error("Error en crearEntradaDetalle (service): ", error);
        throw new Error("crearEntradaDetalle: Possible Foreign Key Constraint"); //'throw' sends this error to the controller
        
    }

}


exports.updateEntrada = async function(idEntrada, entrada) {
    let entradaActualizada = false;

    entradaActualizada = await db.Entrada.findByPk(idEntrada)
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


    //Helper functions.

//Since function 'crear' (above) does a bunch of things before actually posting the new entrada,
//helper functions are here to simplify understanding of code procedure. 

async function checkFolio(db) {

        //gets last Folio from entradas tabble. To do so, it must be sorted in descending order.
        //order: [[column 'folio' in 'descending' order]]
    const lastFolio = await db.Entrada.findOne({
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
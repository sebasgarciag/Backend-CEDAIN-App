const { Op } = require('sequelize');
const dbConfig = require('../config/db.config');
const db = require('../models');

exports.buscarTodas = async function() { // RETURNS ALL
    entradas = await db.Entrada.findAll();
    return entradas;
}

exports.buscarPorId = async function(idEntrada) { //RETURNS ENTRY INFO FROM THE ID GIVEN ONLY
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

exports.entradasPorFecha = async function(date) { //RETURNS ALL ENTRIES ON GIVEN DATE (YYYY-MM-DD)

    let desde = new Date(date);
    let hasta = new Date(date);
    hasta.setDate(hasta.getDate() + 1);

    console.log("============================================");
    console.log("Desde:", desde, "Hasta:", hasta);
    console.log("============================================");

    let entradas = await db.Entrada.findAll({
        where: {
            createdAt: {
                [Op.gte]: desde, //.gte equals to  >= x
                [Op.lt]: hasta     //.lt equals to < x
            }

        }
    });

    return entradas;
}







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
    
}
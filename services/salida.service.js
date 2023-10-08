const db = require('../models');
const { Op } = require('sequelize');
const dbConfig = require('../config/db.config');

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

exports.crearSalida = async function(salida) {   //CREATES NEW SALIDA. RECEIVES ALL THE REQUIRED DATA INSIDE THE OBJECT COUGHT BY THE FUNCTION. (salida)
        
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


exports.crearSalidaDetalle = async function(salidaDetalle){

    nuevosDetallesSalida = await db.SalidaDetalle.bulkCreate(salidaDetalle);
    return nuevosDetallesSalida;

}


//RETURNS all salidas from given user_id
exports.buscarSalidasDeUsuario = async function(idUsuario) {
    let salida = undefined;

            //This avoids the server from crashing if error are to be found. No errors = return results.
    try {
        salidas = await db.Salida.findAll({ //entre todas las salidas, busca la que tenga id_usuario == idUsuario
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

        console.log("Salidas de usuario: " + salidas.length);
        return salida;

        }
        catch (error) {
            console.error("Error en salida.service.js: ", error);
            throw new Error("Error en salida.service.js; CHECK YOUR TERMINAL!\nProbablemente necesites informacion de una tabla que esta vacia.");
        }



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

exports.buscarTodasComunidades = async function() { // RETURNS ALL
    comunidades = await db.Comunidad.findAll();
    return comunidades;
}
exports.buscarTodosEventos = async function() { // RETURNS ALL
    eventos = await db.Evento.findAll();
    return eventos;
}
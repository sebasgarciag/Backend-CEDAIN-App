const db = require('../models');
const { Op } = require('sequelize');
const dbConfig = require('../config/db.config');

exports.buscarTodas = async function() { // RETURNS ALL
    salidas = await db.Salida.findAll();
    return salidas;
}

exports.crearSalidaDetalle = async function(salidaDetalle){

    nuevosDetalles = await db.SalidaDetalle.bulkCreate(salidaDetalle);
    return nuevosDetalles;

}


//RETURNS all salidas from given user_id
exports.buscarSalidasDeUsuario = async function(idUsuario) {
    let salida = undefined;

            //This avoids the server from crashing if error are to be found. No errors = return results.
    try {
        salidas = await db.Salida.findAll({ //entre todas las salidas, busca la que tenga id_usuario == idUsuario
            where: {
                id_usuario: idUsuario
            }
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
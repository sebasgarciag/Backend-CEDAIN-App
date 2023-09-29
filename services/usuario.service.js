const { Op } = require('sequelize');
const dbConfig = require('../config/db.config');
const db = require('../models');

/**
 * Crea un Usuario Nuevo y la persiste
 * @param {newUsuario} usuario - Usuario que se quiere crear
 * @returns {newUsuario} - Usuario creada
 */

exports.crearUsuario = async function (usuario) {
    try {
        nuevoUsuario = await db.newUsuario.create(usuario);
        console.log("Nuevo usuario agregado" + nuevoUsuario.nombre);
        return nuevoUsuario;
    }
    catch (error) {
        console.error("Error en usuario.service.js: ", error);
        throw new Error("Error en usuario.service.js");
    }
    
}


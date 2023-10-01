const db = require("../models");

exports.buscarTodos = async function () {
  // RETURNS ALL
  let usuarios = null;
  try {
    usuarios = await db.Usuario.findAll();
  } catch {
    //
  }
  return usuarios;
};

exports.buscarPorId = async function (id_usuario) {
  //RETURNS USER BY ID
  let usuario = null;
  try{
    usuario = await db.Usuario.findByPk(id_usuario);
  }
  catch{
    // Fallo en la DB
    return false
  }
  return usuario;
};

exports.updateUsuario = async function (id_usuario, usuario) {
  let found_usuario = null;

  try {
    found_usuario = await db.Usuario.findByPk(id_usuario);
  } catch {
    // Fallo en la DB
    return false;
  }

  console.log("IM HERE UPDATE USUARIO.SERVICE");

  if (found_usuario != null) {
    let usuario_actualizado = null;
    try {
      usuario_actualizado = await db.Usuario.update(usuario, {
        where: {
          id_usuario: id_usuario,
        },
      });
    } catch {
      // fallo en la DB
      return false
    }
    return usuario_actualizado;
  }
};
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


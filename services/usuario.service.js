const db = require("../models");

/**
 * @name crearUsuario
 * @description Crea un nuevo usuario en la base de datos.
 * @async
 * @param {object} usuario - El objeto de usuario a crear.
 * @returns {object} El usuario recién creado.
 * @throws {Error} Error si hay un problema al crear el usuario.
 */
exports.crearUsuario = async function (usuario) {
  try {
    nuevoUsuario = await db.Usuario.create(usuario);
    console.log("Nuevo usuario agregado" + nuevoUsuario.nombre);
    return nuevoUsuario;
  }
  catch (error) {
    console.error("Error en usuario.service.js: ", error);
    throw new Error("Error en usuario.service.js");
  }
}

/**
 * @name buscarUsuarioPorCorreo
 * @description Busca un usuario en la base de datos por su correo electrónico.
 * @async
 * @param {string} correo - El correo electrónico del usuario a buscar.
 * @returns {object} El usuario encontrado.
 * @throws {Error} Error si hay un problema al buscar el usuario.
 */
exports.buscarUsuarioPorCorreo = async function (correo) {
  try {
    let usuario = await db.Usuario.findOne({ where: { correo: correo } });
    return usuario;
  } catch (error) {
    console.error("Error al buscar usuario por correo: ", error);
    throw error;
  }
};

/**
 * @name buscarTodos
 * @description Busca todos los usuarios en la base de datos.
 * @async
 * @returns {array} Lista de todos los usuarios.
 */
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

/**
 * @name buscarPorId
 * @description Busca un usuario en la base de datos por su ID.
 * @async
 * @param {string} id_usuario - El ID del usuario a buscar.
 * @returns {object} El usuario encontrado.
 */
exports.buscarPorId = async function (id_usuario) {
  //RETURNS USER BY ID
  let usuario = null;
  try {
    usuario = await db.Usuario.findByPk(id_usuario);
  }
  catch {
    // Fallo en la DB
    return false
  }
  return usuario;
};

/**
 * @name updateUsuario
 * @description Actualiza un usuario existente en la base de datos.
 * @async
 * @param {string} id_usuario - El ID del usuario a actualizar.
 * @param {object} usuario - El objeto de usuario con los datos actualizados.
 * @returns {object} El usuario actualizado.
 */
exports.updateUsuario = async function (id_usuario, usuario) {
  let found_usuario = null;

  try {
    found_usuario = await db.Usuario.findByPk(id_usuario);
  } catch {
    // Fallo en la DB
    return false;
  }


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
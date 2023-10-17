

const usuarioService = require("../services/usuario.service");
const { validationResult } = require("express-validator");
const CryptoES = require("crypto-js");



/**
 * @name postCrearUsuario
 * @description Función para crear un nuevo usuario.
 * @async
 * @param {object} req - El objeto de solicitud HTTP.
 * @param {object} res - El objeto de respuesta HTTP.
 * @returns {object} Usuario creado exitosamente.
 * @throws {Error} Error durante el proceso de creación del usuario.
 */
//Crea Usuario
exports.postCrearUsuario = async function (req, res) {
  try {
    let newUsuario = req.body;     //todo lo que viene en el json payload

    // Encriptar la contraseña
    newUsuario.password = CryptoES.MD5(newUsuario.password).toString();

    let usuarioCreado = await usuarioService.crearUsuario(newUsuario);
    return res.status(201).json(usuarioCreado);
  }
  catch (error) { //En caso de error relacionado a la base de datos, enter here.
    console.error("Error al intentar crear usuario: ", error);
    console.log("Error al intentar crear usuario: ", error);
    return res.status(500).json({ success: false, message: "Error durante proceso de crear usuario" });
  }
};



/**
 * @name postLogin
 * @description Función para iniciar sesión de un usuario.
 * @async
 * @param {object} req - El objeto de solicitud HTTP.
 * @param {object} res - El objeto de respuesta HTTP.
 * @returns {object} Usuario autenticado exitosamente.
 * @throws {Error} Error durante el proceso de inicio de sesión.
 */
exports.postLogin = async function (req, res) {
  
  const secretKey = "CEDAIN"
  try {
    let loginData = req.body;     //todo lo que viene en el json payload

    // Verifica si la contraseña existe
    if (!loginData.password) {
      throw new Error('Contraseña no proporcionada');
    }

    // Busca al usuario en la base de datos
    let usuario = await usuarioService.buscarUsuarioPorCorreo(loginData.correo);

    if (!usuario) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    let passwordIngresada = loginData.password;  // La contraseña ingresada por el usuario
    let passwordCifrada = usuario.password;  // La contraseña cifrada almacenada en la base de datos

    passwordIngresada = CryptoES.MD5(loginData.password).toString();

  

    // Comparar la contraseña ingresada con la contraseña guardada
    passwordCorrecta = (passwordIngresada === passwordCifrada);

    if (!passwordCorrecta) {
      return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
    }

    // Si todo está bien, regresa true
    return res.json({
      success: true,
      user: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido_paterno: usuario.apellido_paterno,
        correo: usuario.correo,
        tipo: usuario.tipo
      }
    }).status(200);
  }
  catch (error) { //En caso de error relacionado a la base de datos, enter here.
    console.error("Error al intentar iniciar sesión: ", error);
    console.log("Error al intentar iniciar sesión: ", error);
    return res.status(500).json({ success: false, message: "Error durante proceso de inicio de sesión" });
  }
};



/**
 * @name getBuscarTodos
 * @description Función para buscar todos los usuarios.
 * @async
 * @param {object} req - El objeto de solicitud HTTP.
 * @param {object} res - El objeto de respuesta HTTP.
 * @returns {object} Lista de usuarios si se encuentran.
 * @throws {Error} Error si la base de datos no está disponible o no se encontraron datos.
 */
exports.getBuscarTodos = async function (req, res) {
  let usuarios = await usuarioService.buscarTodos();
  if (usuarios == null) {
    res.status(503).json({ error: "Base de datos no disponible" });
  } else if (usuarios.length == 0) {
    res.status(204).json({ Message: "No se encontraron datos" });
  } else {
    res.status(200).json(usuarios);
  }
};



/**
 * @name getBuscarPorId
 * @description Función para buscar un usuario por su ID.
 * @async
 * @param {object} req - El objeto de solicitud HTTP.
 * @param {object} res - El objeto de respuesta HTTP.
 * @returns {object} Usuario si se encuentra.
 * @throws {Error} Error si la base de datos no está disponible o no se encontró al usuario.
 */
exports.getBuscarPorId = async function (req, res) {
  let result = validationResult(req);

  if (result.errors.length > 0) {
    res.status(400).json({ success: false, error: result });
  } else {
    let id_usuario = req.params.id;
    let usuario = await usuarioService.buscarPorId(id_usuario);

    if (usuario == null) {
      res.status(404).json({"error": "usuario no encontrado"});
    } else if (usuario == false) {
      res.status(503).json({ "error": "Base de datos no disponible" });
    } else {
      res.status(200).json(usuario);
    }
  }
};

/**
 * @name updateUsuario
 * @description Función para actualizar un usuario existente.
 * @async
 * @param {object} req - El objeto de solicitud HTTP.
 * @param {object} res - El objeto de respuesta HTTP.
 * @returns {object} Usuario actualizado si se encuentra.
 * @throws {Error} Error si la base de datos no está disponible o no se encontró al usuario.
 */
exports.updateUsuario = async function (req, res) {
  let result = validationResult(req);

  if (result.errors.length > 0) {
    res.status(400).json({ success: false, error: result }); //aqui manda los errores
  } else {
    let usuario = req.body;
    let id_usuario = req.params.id;

    const usuario_actualizado = await usuarioService.updateUsuario(
      id_usuario,
      usuario
    );

    if (usuario_actualizado == null) {
      return res.status(404).json({ 'error': "Usuario no encontrado" });
    } else if (usuario_actualizado == false) {
      return res.status(503).json({ 'error': "Base de datos no disponible" });
    } else {
      return res.status(200).json({ success: true }); // Devuelve el registro actualizado
    }
  }


};

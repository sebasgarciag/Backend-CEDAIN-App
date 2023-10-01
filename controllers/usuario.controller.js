const usuarioService = require("../services/usuario.service");
const { validationResult } = require("express-validator");

const bcrypt = require('bcrypt');
const saltRounds = 10;

//Crea Usuario
exports.postCrearUsuario = async function (req, res) {
  let result = validationResult(req);
  console.log(req.body);

  try {
    let newUsuario = req.body;     //todo lo que viene en el json payload

    // Verifica si la contraseña existe antes de hashearla
    if (newUsuario.password) {
      newUsuario.password = bcrypt.hashSync(newUsuario.password, saltRounds);
    } else {
      throw new Error('Contraseña no proporcionada');
    }

    let usuarioCreado = await usuarioService.crearUsuario(newUsuario);
    return res.json(usuarioCreado).status(201);
  }
  catch (error) { //En caso de error relacionado a la base de datos, enter here.
    console.error("Error al intentar crear usuario: ", error);
    return res.status(500).json({ success: false, message: "Error durante proceso de crear usuario" });
  }
};
// GET ALL USERS
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

//GET USER BY ID
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

//UPDATE EXISTING USER
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

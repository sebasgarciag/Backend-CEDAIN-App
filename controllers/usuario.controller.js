const usuarioService = require("../services/usuario.service");
const { validationResult } = require("express-validator");

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
      return res.status(404).json({'error': "Usuario no encontrado" });
    } else if (usuario_actualizado == false) {
      return res.status(503).json({ 'error': "Base de datos no disponible" });
    } else {
      return res.status(200).json({ success: true }); // Devuelve el registro actualizado
    }
  }
};

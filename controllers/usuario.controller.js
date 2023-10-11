

const usuarioService = require("../services/usuario.service");
const { validationResult } = require("express-validator");
const CryptoES = require("crypto-js");




//Crea Usuario
exports.postCrearUsuario = async function (req, res) {


  try {
    let newUsuario = req.body;     //todo lo que viene en el json payload

    let usuarioCreado = await usuarioService.crearUsuario(newUsuario);
    return res.json(usuarioCreado).status(201);
  }
  catch (error) { //En caso de error relacionado a la base de datos, enter here.
    console.error("Error al intentar crear usuario: ", error);
    console.log("Error al intentar crear usuario: ", error);
    return res.status(500).json({ success: false, message: "Error durante proceso de crear usuario" });
  }
};


//Login
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

    // Compara la contraseña proporcionada con la contraseña encriptada almacenada


    let passwordIngresada = loginData.password;  // La contraseña ingresada por el usuario
    let passwordCifrada = usuario.password;  // La contraseña cifrada almacenada en la base de datos
  

    // Desencriptar la contraseña cifrada
    let bytes = CryptoES.AES.decrypt(passwordCifrada, secretKey);
    let passwordDesencriptada = bytes.toString(CryptoES.enc.Utf8);

    // Comparar la contraseña ingresada con la contraseña desencriptada
    passwordCorrecta = (passwordIngresada === passwordDesencriptada);

    if (!passwordCorrecta) {
      return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
    }

    // Si todo está bien, regresa true
    return res.json({ success: true }).status(200);
  }
  catch (error) { //En caso de error relacionado a la base de datos, enter here.
    console.error("Error al intentar iniciar sesión: ", error);
    console.log("Error al intentar iniciar sesión: ", error);
    return res.status(500).json({ success: false, message: "Error durante proceso de inicio de sesión" });
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

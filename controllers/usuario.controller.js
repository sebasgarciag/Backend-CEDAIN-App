const usuarioService = require('../services/usuario.service');
const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.postCrearUsuario = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        return res.status(400).json({ success: false, error: result });
    }

    try {
        let newUsuario = req.body;     //todo lo que viene en el json payload

        // Hashea la contraseña antes de guardarla
        newUsuario.password = bcrypt.hashSync(newUsuario.password, saltRounds);

        let usuarioCreado = await usuarioService.crearUsuario(newUsuario);
        return res.json(usuarioCreado).status(201);
    }
    catch (error) { //En caso de error relacionado a la base de datos, enter here.
        console.error("Error al intentar crear usuario: ", error);
        return res.status(500).json({ success: false, message: "Error durante proceso de crear usuario" });
    }
};

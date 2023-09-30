const usuarioService = require('../services/usuario.service');
const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;

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

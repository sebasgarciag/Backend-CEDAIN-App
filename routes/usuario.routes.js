const router = require("express").Router();
const { check, param } = require('express-validator');
let usuarioController = require("../controllers/usuario.controller");

router.post("/newUsuario", [


], usuarioController.postCrearUsuario);


module.exports = router;
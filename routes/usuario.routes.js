const router = require("express").Router();
let usuarioController = require("../controllers/usuario.controller");

router.post("/newUsuario", usuarioController.postCrearUsuario);

module.exports = router;

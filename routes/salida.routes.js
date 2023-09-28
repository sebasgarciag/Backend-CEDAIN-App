const router = require("express").Router();
const { check, param } = require('express-validator');
let salidaController = require("../controllers/salida.controller");

router.get("/salidas", salidaController.getBuscarTodas);
router.get("/comunidades", salidaController.getBuscarTodasComunidades);

module.exports = router;
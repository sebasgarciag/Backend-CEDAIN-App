const router = require("express").Router();
const { check, param } = require('express-validator');

let entradaDetallesController = require("../controllers/entradaDetalles.controller");

//GET 
router.get("/entradas/:idEntrada", [ 
    param("idEntrada").isNumeric().withMessage("ID debe ser numerico")
], entradaDetallesController.getBuscarPorId);

module.exports = router;
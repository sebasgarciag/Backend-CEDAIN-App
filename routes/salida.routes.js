const router = require("express").Router();
const { check, param } = require('express-validator');
let salidaController = require("../controllers/salida.controller");

router.get("/salidas", salidaController.getBuscarTodas);

//CREATE entrada
router.post("/salida", [ 

    // check("folio").isNumeric().withMessage("Folio debe ser numérico y es obligatorio"),
    check("serie").isLength({ max: 5 }).withMessage("Serie no debe exceder 5 caracteres y es obligatorio"),
    check("observaciones").isLength({ max: 255 }).withMessage("Observaciones no debe exceder 255 caracteres y es obligatorio"),
    check("id_usuario").isNumeric().withMessage("ID de usuario debe ser numérico y es obligatorio"),
    check("id_almacen").isNumeric().withMessage("ID de almacén debe ser numérico y es obligatorio"),
    check("emisor").isLength({ max: 40 }).withMessage("Emisor no debe exceder 40 caracteres y es obligatorio"),
    check("id_evento").isNumeric().withMessage("ID de evento debe ser numérico y es obligatorio")
    
], salidaController.postCrearSalida);


module.exports = router;
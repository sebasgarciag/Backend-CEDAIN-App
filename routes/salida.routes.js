const router = require("express").Router();
const { check, param } = require('express-validator');
let salidaController = require("../controllers/salida.controller");

router.get("/salidas", salidaController.getBuscarTodas);


router.post("/salidas-detalles", [

    //Se asume que este endpoint recibe un array. MODIFY THIS TO RECEIVE AN ARRAY

    //check("*.id_salida_detalle").isNumeric().withMessage("id entrada detalle debe ser numerico"),
    check("*.id_salida").isNumeric().withMessage("id salida debe ser numerico"),
    check("*.id_producto").isNumeric().withMessage("id producto debe ser numerico"),
    check("*.cantidad").isNumeric().withMessage("cantidad debe ser numerico"),
    check("*.precio_unitario").isNumeric().withMessage("precio_unitario debe ser numerico"),

], salidaController.postSalidasDetalles);


module.exports = router;
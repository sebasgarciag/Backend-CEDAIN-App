const router = require("express").Router();
const { check, param } = require('express-validator');
let salidaController = require("../controllers/salida.controller");

router.get("", salidaController.getBuscarTodas);
router.get("/comunidades", salidaController.getBuscarTodasComunidades);
router.get("/eventos", salidaController.getBuscarTodosEventos);

router.post("/salidas-detalles", [

    //Se asume que este endpoint recibe un array. MODIFY THIS TO RECEIVE AN ARRAY

    //check("*.id_salida_detalle").isNumeric().withMessage("id entrada detalle debe ser numerico"),
    check("*.id_salida").isNumeric().withMessage("id salida debe ser numerico"),
    check("*.id_producto").isNumeric().withMessage("id producto debe ser numerico"),
    check("*.cantidad").isNumeric().withMessage("cantidad debe ser numerico"),
    check("*.precio_unitario").isNumeric().withMessage("precio_unitario debe ser numerico"),

], salidaController.postSalidasDetalles);

//CREATE entrada
router.post("", [ 

    // check("folio").isNumeric().withMessage("Folio debe ser numérico y es obligatorio"),
    check("serie").isLength({ max: 5 }).withMessage("Serie no debe exceder 5 caracteres y es obligatorio"),
    check("observaciones").isLength({ max: 255 }).withMessage("Observaciones no debe exceder 255 caracteres y es obligatorio"),
    check("id_usuario").isNumeric().withMessage("ID de usuario debe ser numérico y es obligatorio"),
    check("id_almacen").isNumeric().withMessage("ID de almacén debe ser numérico y es obligatorio"),
    check("emisor").isLength({ max: 40 }).withMessage("Emisor no debe exceder 40 caracteres y es obligatorio"),
    check("id_evento").isNumeric().withMessage("ID de evento debe ser numérico y es obligatorio")
    
], salidaController.postCrearSalida);

router.get("/salida-detalles/:idSalida", [ 
    param("idSalida").isNumeric().withMessage("ID debe ser numerico")
], salidaController.getDetallesPorId);

module.exports = router;
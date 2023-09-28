const router = require("express").Router();
const { check, param, body } = require('express-validator');

let entradaController = require("../controllers/entrada.controller");

//CREATE entrada
router.post("/entradas", [ 

    check("folio").isNumeric().withMessage("Folio debe ser numérico y es obligatorio"),
    check("serie").isLength({ max: 5 }).withMessage("Serie no debe exceder 5 caracteres y es obligatorio"),
    check("observaciones").isLength({ max: 255 }).withMessage("Observaciones no debe exceder 255 caracteres y es obligatorio"),
    check("id_usuario").isNumeric().withMessage("ID de usuario debe ser numérico y es obligatorio"),
    check("id_almacen").isNumeric().withMessage("ID de almacén debe ser numérico y es obligatorio"),
    check("emisor").isLength({ max: 40 }).withMessage("Emisor no debe exceder 40 caracteres y es obligatorio"),
    check("id_comunidad").isNumeric().withMessage("ID de comunidad debe ser numérico y es obligatorio"),
    check("id_evento").isNumeric().withMessage("ID de evento debe ser numérico y es obligatorio")
    
], entradaController.postCrear);

//POST PRODUCTOS INTO entradas_detalles
router.post("/entradas-detalles", [
    //valida que se este mandando un valor numerico.
    //Are all these checks necessary?

    //Se asume que este endpoint recibe un array. MODIFY THIS TO RECEIVE AN ARRAY

    check("*.id_entrada_detalle").isNumeric().withMessage("id entrada detalle debe ser numerico"),
    check("*.id_entrada").isNumeric().withMessage("id entrada debe ser numerico"),
    check("*.id_producto").isNumeric().withMessage("id producto debe ser numerico"),
    check("*.cantidad").isNumeric().withMessage("cantidad debe ser numerico"),
    check("*.precio_unitario").isNumeric().withMessage("precio_unitario debe ser numerico"),

], entradaController.postEntradasDetalles);

// GET All the entradas OR trae entradas por fecha.

router.get("", entradaController.getBuscarTodas);

//GET entradas por id
router.get("/:id", [ 
    param("id").isNumeric().withMessage("ID debe ser numerico")
], entradaController.getBuscarPorId);


    //(((((AS OF SEPTEMBER 19 2023, IT HAS BEEN DISCUSSED THAT THIS FUNCTION MIGHT BE DELETED))))))
//UPDATE EXISTING
router.put("/:id", [
    //Validate the ID in the URL
    //THIS METHOD ASSUMES THE REQUIRED INFO TO UPDATE AN ENTRY IS THE ID ONLY.
    //YOU CAN ALSO UPDATE JUST ONE OF THE THINGS IN SAID ENTRY, INSTEAD OF REQUIERING EVERY SINGLE COLUMN ON THE DB TABLE.
    param("id").isNumeric().withMessage("Id debe ser numerico")
], entradaController.updateEntrada);


module.exports = router;
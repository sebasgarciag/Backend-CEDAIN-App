const router = require("express").Router();
const { check, param } = require('express-validator');

let entradaController = require("../controllers/entrada.controller");


router.post("/entradas", [ //CREATE

    check("folio").isNumeric().withMessage("Folio debe ser numérico y es obligatorio"),
    check("serie").isLength({ max: 5 }).withMessage("Serie no debe exceder 5 caracteres y es obligatorio"),
    check("observaciones").isLength({ max: 255 }).withMessage("Observaciones no debe exceder 255 caracteres y es obligatorio"),
    check("id_usuario").isNumeric().withMessage("ID de usuario debe ser numérico y es obligatorio"),
    check("id_almacen").isNumeric().withMessage("ID de almacén debe ser numérico y es obligatorio"),
    check("emisor").isLength({ max: 40 }).withMessage("Emisor no debe exceder 40 caracteres y es obligatorio"),
    check("id_comunidad").isNumeric().withMessage("ID de comunidad debe ser numérico y es obligatorio"),
    check("id_evento").isNumeric().withMessage("ID de evento debe ser numérico y es obligatorio")
    
], entradaController.postCrear);

// GET EM ALL
router.get("/entradas", entradaController.getBuscarTodas);

//GET SOM
router.get("/entradas/:id", [ 
    param("id").isNumeric().withMessage("ID debe ser numerico")
], entradaController.getBuscarPorId);


//GET ALL BY DATE
router.get("/entradas/porFecha/:date", [
    param("date").matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("Formato de fecha: YYYY-MM-DD"),

], entradaController.getEntradasPorFecha);


    //(((((AS OF SEPTEMBER 19 2023, IT HAS BEEN DISCUSSED THAT THIS FUNCTION MIGHT BE DELETED))))))
//UPDATE EXISTING
router.put("/entradas/:id", [
    //Validate the ID in the URL
    //THIS METHOD ASSUMES THE REQUIRED INFO TO UPDATE AN ENTRY IS THE ID ONLY.
    //YOU CAN ALSO UPDATE JUST ONE OF THE THINGS IN SAID ENTRY, INSTEAD OF REQUIERING EVERY SINGLE COLUMN ON THE DB TABLE.
    param("id").isNumeric().withMessage("Id debe ser numerico")
], entradaController.updateEntrada);


module.exports = router;
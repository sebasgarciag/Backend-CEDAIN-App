const router = require("express").Router();
const { check, param } = require('express-validator');

let entradaController = require("../controllers/entrada.controller");


router.post("/entradas", [ //CREATE

    check("folio").isNumeric().withMessage("Folio debe ser numérico y es obligatorio"),
    check("serie").isLength({ max: 5 }).withMessage("Serie no debe exceder 5 caracteres y es obligatorio"),

], entradaController.postCrear);

// GET EM ALL
router.get("/entradas", entradaController.getBuscarTodas);

//GET SOM
router.get("/entradas/:id", [ 
    param("id").isNumeric().withMessage("ID debe ser numerico")
], entradaController.getBuscarPorId);

//UPDATE EXISTING
router.put("/entradas/:id", [
    // Validate the ID in the URL
    //THIS METHOD ASSUMES THE REQUIRED INFO TO UPDATE AN ENTRY IS THE ID ONLY.
    //YOU CAN ALSO UPDATE JUST ONE OF THE THINGS IN SAID ENTRY, INSTEAD OF REQUIERING EVERY SINGLE COLUMN ON THE DB TABLE.
    param("id").isNumeric().withMessage("Id debe ser numerico")
], entradaController.updateEntrada);


module.exports = router;
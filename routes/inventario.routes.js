const router = require("express").Router();
const { check, param } = require('express-validator');
let inventarioController = require("../controllers/inventario.controller");

//Update inventario
router.put("/incrementar-inventario", [ 

    check("*.id_producto").isNumeric().withMessage("ID de producto debe ser numérico y es obligatorio"),
    check("*.id_almacen").isNumeric().withMessage("ID de almacén debe ser numérico y es obligatorio"),
    check("*.cantidad").isNumeric().withMessage("La cantidad debe de ser numerica y es obligatoria")
    
], inventarioController.putModificarInventario);

module.exports = router;
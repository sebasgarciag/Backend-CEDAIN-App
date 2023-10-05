const router = require("express").Router();
const { check, param } = require('express-validator');

let productoController = require("../controllers/producto.controller");


router.post("", [ //CREATE

    
    check("nombre").isLength({ max: 80 }).withMessage("nombre no debe exceder 80 caracteres y es obligatorio"),
    check("id_tamaño").isNumeric().withMessage("Id de tamaño debe de ser numerico y es obligatorio"),
    check("medida").isLength({ max: 30 }).withMessage("la medida no debe exceder 30 caracteres y es obligatorio"),
    check("precio_venta").isDecimal().withMessage("El campo debe ser decimal y es obligatorio"),
    check("precio_trueque").isDecimal().withMessage("El campo debe ser decimal y es obligatorio"),
    check("id_categoria").isLength({ max: 30 }).withMessage("Categoria no debe exceder 30 caracteres y es obligatorio"),
    check("nombre_corto").isLength({ max: 40 }).withMessage("Nombre corto no debe exceder 40 caracteres y es obligatorio"),
    
    
], productoController.postCrear);

// GET EM ALL
router.get("", productoController.getBuscarTodas);

//GET SOM
router.get("/:id", [ 
    param("id").isNumeric().withMessage("ID debe ser numerico ")
], productoController.getBuscarPorId);


router.put("/:id", [
    //Validate the ID in the URL
    //THIS METHOD ASSUMES THE REQUIRED INFO TO UPDATE AN ENTRY IS THE ID ONLY.
    //YOU CAN ALSO UPDATE JUST ONE OF THE THINGS IN SAID ENTRY, INSTEAD OF REQUIERING EVERY SINGLE COLUMN ON THE DB TABLE.
    param("id").isNumeric().withMessage("Id debe ser numerico"),
    check("nombre").optional().isLength({ max: 80 }).withMessage("nombre no debe exceder 80 caracteres y es obligatorio"),
    check("id_tamaño").optional().isNumeric().withMessage("Id de tamaño debe de ser numerico y es obligatorio"),
    check("id_categoria").optional().isNumeric().withMessage("Id de tamaño debe de ser numerico y es obligatorio"),
    check("medida").optional().isLength({ max: 30 }).withMessage("la medida no debe exceder 30 caracteres y es obligatorio"),
    check("precio_venta").optional().isDecimal().withMessage("El campo debe ser decimal y es obligatorio"),
    check("precio_trueque").optional().isDecimal().withMessage("El campo debe ser decimal y es obligatorio"),
    check("nombre_corto").optional().isLength({ max: 40 }).withMessage("Nombre corto no debe exceder 40 caracteres y es obligatorio"),
], productoController.updateProducto);

 router.get("/categorias/todas", [
    
 ], productoController.getCategorias );


module.exports = router;
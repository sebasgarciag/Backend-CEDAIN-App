const router = require("express").Router();
const { check, param } = require('express-validator');
let inventarioController = require("../controllers/inventario.controller");

router.get('/exportar-excel/:id', inventarioController.exportarInventarioPorIdExcel);


//Update inventario
router.put("/incrementar-inventario", [ 

    check("*.id_producto").isNumeric().withMessage("ID de producto debe ser numérico y es obligatorio"),
    check("*.id_almacen").isNumeric().withMessage("ID de almacén debe ser numérico y es obligatorio"),
    check("*.cantidad").isNumeric().withMessage("La cantidad debe de ser numerica y es obligatoria")
    
], inventarioController.putModificarInventario);


// GET EM ALL	

router.post("/", [
	check("id_inventario").isNumeric().withMessage("ID debe ser numerico"),
	check("id_producto").isNumeric().withMessage("ID producto debe ser numerico"),
	check("id_almacen").isNumeric().withMessage("ID debe ser numerico"),
	check("cantidad").isNumeric().withMessage("Producto debe ser numerico")
],inventarioController.postCrear)


router.put("/",[

], inventarioController.putProductos)


router.get("/", inventarioController.getBuscarTodosProductos);

router.get("/:id", [ 
    param("id").isNumeric().withMessage("ID debe ser numerico")
], inventarioController.getBuscarPorAlmacen);


module.exports = router;


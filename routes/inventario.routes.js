const router = require("express").Router();
const { check, param } = require('express-validator');
let inventarioController = require("../controllers/inventario.controller");

//Update inventario
router.put("/incrementar-inventario", [ 

    check("*.id_producto").isNumeric().withMessage("ID de producto debe ser numérico y es obligatorio"),
    check("*.id_almacen").isNumeric().withMessage("ID de almacén debe ser numérico y es obligatorio"),
    check("*.cantidad").isNumeric().withMessage("La cantidad debe de ser numerica y es obligatoria")
    
], inventarioController.putModificarInventario);


// GET EM ALL	
router.get("/inventarios", inventarioController.getBuscarTodas);

router.post("/inventarios", [
	//param("id_inventario").isNumeric().withMessage("ID debe ser numerico"),
	//param("id_producto").isNumeric().withMessage("ID producto debe ser numerico"),
	//param("id_almacen").isNumeric().withMessage("ID debe ser numerico"),
	//param("cantidad").isNumeric().withMessage("Producto debe ser numerico")
],inventarioController.postCrear)


router.put("/inventarios/:id",[
	param("id").isNumeric().withMessage("Id debe ser numerico")

], inventarioController.putProductos)

module.exports = router;
const router = require("express").Router();
const { check, param } = require('express-validator');

let inventarioController = require("../controllers/inventario.controller");

// GET EM ALL	
/*router.get("/inventarios", inventarioController.getBuscarTodas);

router.post("/inventarios", [
	//param("id_inventario").isNumeric().withMessage("ID debe ser numerico"),
	//param("id_producto").isNumeric().withMessage("ID producto debe ser numerico"),
	//param("id_almacen").isNumeric().withMessage("ID debe ser numerico"),
	//param("cantidad").isNumeric().withMessage("Producto debe ser numerico")
],inventarioController.postCrear)

// router.post("/inventarios/crear_productos")

router.put("/inventarios/:id",[
	param("id").isNumeric().withMessage("Id debe ser numerico")

], inventarioController.putProductos)*/


router.get("/", inventarioController.getBuscarTodosProductos);

router.get("/:id", [ 
    param("id").isNumeric().withMessage("ID debe ser numerico")
], inventarioController.getBuscarPorAlmacen);

router.get("/:idAlmacen/:idProducto", [ 
    param("idAlmacen").isNumeric().withMessage("ID de almacén debe ser numérico"),
    param("idProducto").isNumeric().withMessage("ID de producto debe ser numérico")
], inventarioController.detallesProducto);


module.exports = router;


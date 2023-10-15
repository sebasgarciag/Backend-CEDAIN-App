const router = require("express").Router();
const multer = require('multer');
const { check, param } = require('express-validator');
let productoController = require("../controllers/producto.controller");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('', upload.single('imagen'), [

  check("nombre").isLength({ max: 80 }).withMessage("nombre no debe exceder 80 caracteres y es obligatorio"),
  check("id_tamanio").optional().isNumeric().withMessage("Id de tamaño debe de ser numerico y es obligatorio"),
  check("medida").isLength({ max: 30 }).withMessage("la medida no debe exceder 30 caracteres y es obligatorio"),
  check("precio_venta").isDecimal().withMessage("El campo debe ser decimal y es obligatorio"),
  check("precio_trueque").isDecimal().withMessage("El campo debe ser decimal y es obligatorio"),
  check("id_categoria").optional().isLength({ max: 30 }).withMessage("Categoria no debe exceder 30 caracteres y es obligatorio"),
  check("nombre_corto").isLength({ max: 40 }).withMessage("Nombre corto no debe exceder 40 caracteres y es obligatorio"),
  check("suspendido").isBoolean().withMessage("Solo puede ser true (1) o false (0)"),
  
], productoController.postCrear);

router.put('/:id', upload.single('imagen'), [
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
  check("suspendido").optional().isBoolean().withMessage("Solo puede ser true (1) o false (0)"),

], productoController.updateProducto);

// GET EM ALL
router.get("", productoController.getBuscarTodas);

//GET SOM
router.get("/:id", [ 
    param("id").isNumeric().withMessage("ID debe ser numerico")
], productoController.getBuscarPorId);

router.get('/:id/image', productoController.getProductImage);

router.get("/categorias/todas", productoController.getCategorias);

 router.get("/tamanios/todos", productoController.getTamanios);
 
router.put("/:id/:state", [
    param("id").isNumeric().withMessage("Id debe ser numerico"),
    check("state").isBoolean().withMessage("El estado debe ser booleano")
], productoController.suspenderProductos);



module.exports = router;
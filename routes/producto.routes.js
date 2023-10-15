const router = require("express").Router();
const multer = require('multer');
const { check, param } = require('express-validator');
let productoController = require("../controllers/producto.controller");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


/**
 * Crea un nuevo producto.
 * 
 * @route {POST} /
 * @bodyparam {string|number} datos - Datos del producto en formato JSON (ver detalles abajo).
 * @formparam {File} imagen - Imagen del producto (opcional).
 * @validates {Object} validation - Valida los datos de entrada con las reglas especificadas.
 * @response {Object} 201 - Producto creado.
 * @response {Object} 500 - Error al crear el producto.
 * @throws {ValidationError} Cuando falla la validación.
 */
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

/**
 * Actualiza un producto existente por su ID.
 * 
 * @route {PUT} /:id
 * @param {number} id - ID del producto que se desea actualizar.
 * @bodyparam {string|number} datos - Datos del producto en formato JSON (ver detalles abajo).
 * @formparam {File} imagen - Imagen del producto (opcional).
 * @validates {Object} validation - Valida los datos de entrada con las reglas especificadas.
 * @response {Object} 200 - Producto actualizado.
 * @response {Object} 500 - Error al actualizar el producto.
 * @throws {ValidationError} Cuando falla la validación.
 */
router.put('/:id', upload.single('imagen'), [
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

/**
 * Obtiene todos los productos.
 * 
 * @route {GET} /
 * @response {Object} 200 - Todos los productos.
 * @response {Object} 500 - Error al buscar los productos.
 */
router.get("", productoController.getBuscarTodas);

/**
 * Obtiene un producto por su ID.
 * 
 * @route {GET} /:id
 * @param {number} id - ID del producto que se desea buscar.
 * @response {Object} 200 - Producto por ID.
 * @response {Object} 500 - Error al buscar el producto.
 * @throws {ValidationError} Cuando falla la validación.
 */
router.get("/:id", [ 
    param("id").isNumeric().withMessage("ID debe ser numerico")
], productoController.getBuscarPorId);

/**
 * Obtiene la imagen de un producto por su ID.
 * 
 * @route {GET} /:id/image
 * @param {number} id - ID del producto para el cual se desea obtener la imagen.
 * @response {Object} 200 - Imagen del producto.
 * @response {Object} 500 - Error al obtener la imagen del producto.
 * @throws {ValidationError} Cuando falla la validación.
 */
router.get('/:id/image', productoController.getProductImage);


/**
 * Obtiene todas las categorías de productos.
 * 
 * @route {GET} /categorias/todas
 * @response {Object} 200 - Todas las categorías de productos.
 * @response {Object} 500 - Error al buscar las categorías.
 */
router.get("/categorias/todas", productoController.getCategorias);

/**
 * Obtiene todos los tamaños de productos.
 * 
 * @route {GET} /tamanios/todos
 * @response {Object} 200 - Todos los tamaños de productos.
 * @response {Object} 500 - Error al buscar los tamaños de productos.
 */
router.get("/tamanios/todos", productoController.getTamanios);
 
/**
 * Suspende o reactiva un producto por su ID y estado.
 * 
 * @route {PUT} /:id/:state
 * @param {number} id - ID del producto que se desea suspender o reactivar.
 * @param {boolean} state - Estado de suspensión (true o false).
 * @validates {Object} validation - Valida el ID y el estado.
 * @response {Object} 200 - Producto suspendido o reactivado con éxito.
 * @response {Object} 500 - Error al suspender o reactivar el producto.
 * @throws {ValidationError} Cuando falla la validación.
 */
router.put("/:id/:state", [
    param("id").isNumeric().withMessage("Id debe ser numerico"),
    check("state").isBoolean().withMessage("El estado debe ser booleano")
], productoController.suspenderProductos);



module.exports = router;
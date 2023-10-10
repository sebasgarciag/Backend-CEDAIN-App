const router = require("express").Router();
const { check, param, body } = require('express-validator');

let entradaController = require("../controllers/entrada.controller");

// Exportar entrada detalles por encima (tabla entradas)
router.get("/exportar/:id", [ 
    param("id").isNumeric().withMessage("ID debe ser numerico")
], entradaController.exportCombinedToExcel);


/**
 * Create New Entrada
 * 
 * @route {POST} /entradas
 * @bodyparam {string/number} todos los datos dentro de la funcion se quieren ser enviados en JSON para continuar.
 * @validates {Object} validation - Validates the input payload with given rules.
 * @response {Object} 201 - Entrada creada.
 * @response {Object} 500 - Error al crear entrada.
 * @throws {ValidationError} When validation fails.
 */
router.post("/entradas", [ 

    check("serie").isLength({ max: 5 }).withMessage("Serie no debe exceder 5 caracteres y es obligatorio"),
    check("observaciones").isLength({ max: 255 }).withMessage("Observaciones no debe exceder 255 caracteres y es obligatorio"),
    check("id_usuario").isNumeric().withMessage("ID de usuario debe ser numérico y es obligatorio"),
    check("id_almacen").isNumeric().withMessage("ID de almacén debe ser numérico y es obligatorio"),
    check("emisor").isLength({ max: 40 }).withMessage("Emisor no debe exceder 40 caracteres y es obligatorio"),
    check("id_comunidad").isNumeric().withMessage("ID de comunidad debe ser numérico y es obligatorio"),
    check("id_evento").isNumeric().withMessage("ID de evento debe ser numérico y es obligatorio")
    
], entradaController.postCrear);



/**
 * POST PRODUCTOS INTO entradas_detalles
 * Los productos seleccionados en entrada, son guardados en la tabla 'entradas_detalles'
 * 
 * @route {POST} /entradas-detalles
 * @bodyparam {string/number} todos los datos dentro de la funcion se quieren ser enviados en JSON para continuar.
 * @validates {Object} validation - Validates the input payload with given rules.
 * @response {Object} 201 - detalles de entrada creada.
 * @response {Object} 500 - Error al crear entrada detalles.
 * @throws {ValidationError} When validation fails.
 */
router.post("/entradas-detalles", [

    check("*.id_entrada").isNumeric().withMessage("id entrada debe ser numerico"),
    check("*.id_producto").isNumeric().withMessage("id producto debe ser numerico"),
    check("*.cantidad").isNumeric().withMessage("cantidad debe ser numerico"),
    check("*.precio_unitario").isNumeric().withMessage("precio_unitario debe ser numerico"),

], entradaController.postEntradasDetalles);


/**
 * Devuelve TODAS las entradas, O EN CASO de enviar parametro (que debe ser una fecha en formato YYYY-MM-DD),
 * devuelve todas las entradas de dicha fecha.
 * Para traer por fecha:
 * http://localhost:8080/entradas?date=2023-09-06
 * 
 * @route {GET} / OR {GET} entradas?date=YYYY-MM-DD
 * @response {Object} 201 - Entradas.
 * @response {Object} 500 - Error al traer entrada.
 */
router.get("", entradaController.getBuscarTodas);


/**
 * Trae la entrada del id dado
 * //http://localhost:8080/entradas/1
 * 
 * @route {GET} /entradas/:id
 * @bodyparam {number} el id debe ser un numero.
 * @response {Object} 201 - Entrada por id.
 * @response {Object} 500 - Error encontrar.
 * @throws {ValidationError} When validation fails.
 */
router.get("/:id", [ 
    param("id").isNumeric().withMessage("ID debe ser numerico")
], entradaController.getBuscarPorId);


/**
 * Trae todas las entradas de un almacenista, dado su id.
 * 
 * @route {GET} /entradas-usuario/:id
 * @bodyparam {number} el id debe ser un numero.
 * @response {Object} 201 - Entradas de almacenista por id.
 * @response {Object} 500 - Error encontrar.
 * @throws {ValidationError} When validation fails.
 */
router.get("/entradas-usuario/:id", [ 
    param("id").isNumeric().withMessage("ID de usuario debe ser numerico")
], entradaController.getEntradasPorUsuario);



    //(((((AS OF SEPTEMBER 19 2023, IT HAS BEEN DISCUSSED THAT THIS FUNCTION MIGHT BE DELETED))))))
//UPDATE EXISTING
router.put("/:id", [
    //Validate the ID in the URL
    //THIS METHOD ASSUMES THE REQUIRED INFO TO UPDATE AN ENTRY IS THE ID ONLY.
    //YOU CAN ALSO UPDATE JUST ONE OF THE THINGS IN SAID ENTRY, INSTEAD OF REQUIERING EVERY SINGLE COLUMN ON THE DB TABLE.
    param("id").isNumeric().withMessage("Id debe ser numerico")
], entradaController.updateEntrada);


/**
 * Trae todos los detalles de una entrada; regresa todos los productos de una entrada.
 * requiere del id de la entrada la cual se quiere ver los detalles de.
 * 
 * @route {GET} /entradas-detalles/:id
 * @bodyparam {number} el id debe ser un numero.
 * @response {Object} 201 - Detalles de entrada por id de la entrada.
 * @response {Object} 500 - Error encontrar.
 * @throws {ValidationError} When validation fails.
 */
router.get("/entrada-detalles/:idEntrada", [ 
    param("idEntrada").isNumeric().withMessage("ID debe ser numerico")
], entradaController.getDetallesPorId);


module.exports = router;
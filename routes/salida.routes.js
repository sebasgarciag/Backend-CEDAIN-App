/**
 * @module salidaRoutes
 * @requires express
 * @requires express-validator
 * @requires ../controllers/salida.controller
 */

const router = require("express").Router();
const { check, param } = require('express-validator');
let salidaController = require("../controllers/salida.controller");


// Ruta para exportar una salida específica a Excel
router.get('/exportar-excel/:id', salidaController.exportCombinedToExcel);

router.get("", salidaController.getBuscarTodas);

/**
 * Obtiene todas las comunidades.
 * @name get/comunidades
 * @function
 * @memberof module:salidaRoutes
 * @inner
 * @route {GET} /comunidades
 */
router.get("/comunidades", salidaController.getBuscarTodasComunidades);

/**
 * Obtiene todos los eventos.
 * @name get/eventos
 * @function
 * @memberof module:salidaRoutes
 * @inner
 * @route {GET} /eventos
 */
router.get("/eventos", salidaController.getBuscarTodosEventos);

/**
 * Añade detalles a una salida.
 * @name post/salidas-detalles
 * @function
 * @memberof module:salidaRoutes
 * @inner
 * @route {POST} /salidas-detalles
 * @param {object} request.body - Detalles de la salida.
 */
router.post("/salidas-detalles", [
    check("*.id_salida").isNumeric().withMessage("id salida debe ser numerico"),
    check("*.id_producto").isNumeric().withMessage("id producto debe ser numerico"),
    check("*.cantidad").isNumeric().withMessage("cantidad debe ser numerico"),
    check("*.precio_unitario").isNumeric().withMessage("precio_unitario debe ser numerico"),
], salidaController.postSalidasDetalles);

/**
 * Crea una nueva salida.
 * @name post/crear-salida
 * @function
 * @memberof module:salidaRoutes
 * @inner
 * @route {POST} /
 * @param {object} request.body - Datos de la salida.
 */
router.post("", [ 
    check("serie").isLength({ max: 5 }).withMessage("Serie no debe exceder 5 caracteres y es obligatorio"),
    check("observaciones").isLength({ max: 255 }).withMessage("Observaciones no debe exceder 255 caracteres y es obligatorio"),
    check("id_usuario").isNumeric().withMessage("ID de usuario debe ser numérico y es obligatorio"),
    check("id_almacen").isNumeric().withMessage("ID de almacén debe ser numérico y es obligatorio"),
    check("emisor").isLength({ max: 40 }).withMessage("Emisor no debe exceder 40 caracteres y es obligatorio"),
    check("id_evento").isNumeric().withMessage("ID de evento debe ser numérico y es obligatorio"),
], salidaController.postCrearSalida);

/**
 * Obtiene los detalles de una salida por su ID.
 * @name get/salida-detalles/:idSalida
 * @function
 * @memberof module:salidaRoutes
 * @inner
 * @route {GET} /salida-detalles/:idSalida
 * @param {number} request.params.idSalida - ID de la salida.
 */
router.get("/salida-detalles/:idSalida", [ 
    param("idSalida").isNumeric().withMessage("ID debe ser numerico")
], salidaController.getDetallesPorId);

/**
 * Obtiene todas las salidas de un usuario por su ID.
 * @name get/salidas-usuario/:id
 * @function
 * @memberof module:salidaRoutes
 * @inner
 * @route {GET} /salidas-usuario/:id
 * @param {number} request.params.id - ID del usuario.
 */
router.get("/salidas-usuario/:id", [ 
    param("id").isNumeric().withMessage("ID de usuario debe ser numerico")
], salidaController.getSalidasPorUsuario);

/** @exports salidaRoutes */
module.exports = router;

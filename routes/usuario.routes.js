const router = require("express").Router();
const { check, param } = require('express-validator');

let usuarioController = require("../controllers/usuario.controller");

/**
 * @route GET /
 * @description Get all users
 */
router.get("/", usuarioController.getBuscarTodos);

/**
 * @route GET /:id
 * @description Get a user by ID
 */
router.get("/:id", [
    param("id").isNumeric().withMessage("ID debe ser numerico")
], usuarioController.getBuscarPorId);

/**
 * @route PUT /:id
 * @description Update an existing user
 */
router.put("/:id", [
    param("id").isNumeric().withMessage("Id debe ser numerico"),
    check("nombre").optional().isLength({ max: 40 }).withMessage("nombre  no debe exceder 40 caracteres"),
    check("apellido_paterno").optional().isLength({ max: 40 }).withMessage("apellido_paterno no debe exceder 40 caracteres"),
    check("apellido_materno").optional().isLength({ max: 40 }).withMessage("apellido_materno no debe exceder 40 caracteres"),
    check("tipo").optional().isLength({ max: 40 }).withMessage("tipo no debe exceder 40 caracteres"),
    check("password").optional().isLength({ max: 255 }).withMessage("password  no debe exceder 255 caracteres"),
], usuarioController.updateUsuario);

/**
 * @route POST /newUsuario
 * @description Create a new user
 */
router.post("/newUsuario", [
    check("nombre").notEmpty().isLength({ max: 40 }).withMessage("nombre  no debe exceder 40 caracteres"),
    check("apellido_paterno").notEmpty().isLength({ max: 40 }).withMessage("apellido_paterno no debe exceder 40 caracteres"),
    check("apellido_materno").notEmpty().isLength({ max: 40 }).withMessage("apellido_materno no debe exceder 40 caracteres"),
    check("tipo").notEmpty().isLength({ max: 40 }).withMessage("tipo no debe exceder 40 caracteres"),
    check("correo").notEmpty().withMessage("correo no debe estar vacio").isEmail().withMessage("correo debe ser un correo valido"),
    check("password").notEmpty().isLength({ max: 255 }).withMessage("password no debe exceder 255 caracteres"),

], usuarioController.postCrearUsuario);

/**
 * @route POST /login
 * @description Login a user
 */
router.post("/login", [

    check("correo").notEmpty().withMessage("correo no debe estar vacio").isEmail().withMessage("correo debe ser un correo valido"),
    check("password").notEmpty().isLength({ max: 255 }).withMessage("password no debe exceder 255 caracteres"),

], usuarioController.postLogin);



module.exports = router;

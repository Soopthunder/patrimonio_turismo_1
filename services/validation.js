const { body } = require('express-validator');

exports.contectValidation = [
    body("name")
        .trim()
        .not().isEmpty().withMessage("El nombre es requerido"),
    body("email")
        .isEmail().normalizeEmail().withMessage("El correo no es correcto"),
    body("phone")
        .isNumeric().withMessage("No es un número válido")
        .custom(value => value.charAt(0) === '0').withMessage("Código de área incorrecto"),
    body("subject")
        .trim()
        .not().isEmpty().withMessage("El asunto es requerido")
        .isLength({ min: 5 }).withMessage(" Debe tener al menos 5 caracteres ")
        .isLength({ max: 50 }).withMessage("Debe ser como máximo 50 caracteres"),
    body("message")
        .trim()
        .not().isEmpty().withMessage("La descripción es requerida")
        .isLength({ min: 10 }).withMessage(" Debe tener al menos 10 caracteres ")
        .isLength({ max: 500 }).withMessage("Debe ser como máximo 500 caracteres")
];
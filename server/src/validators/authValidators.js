import { body } from "express-validator";

const normalizeEmail = (value) =>
  typeof value === "string" ? value.trim().toLowerCase() : value;

export const registerValidators = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isLength({ min: 2, max: 80 })
    .withMessage("El nombre debe tener entre 2 y 80 caracteres"),
  body("email")
    .customSanitizer(normalizeEmail)
    .notEmpty()
    .withMessage("El correo es obligatorio")
    .bail()
    .isEmail()
    .withMessage("Ingresa un correo válido"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
];

export const loginValidators = [
  body("email")
    .customSanitizer(normalizeEmail)
    .notEmpty()
    .withMessage("El correo es obligatorio")
    .bail()
    .isEmail()
    .withMessage("Ingresa un correo válido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

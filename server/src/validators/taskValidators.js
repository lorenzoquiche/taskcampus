import { body, param, query } from "express-validator";

const priorities = ["low", "medium", "high"];
const statuses = ["pending", "in_progress", "completed"];

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export const taskIdValidator = [
  param("id").isInt({ min: 1 }).withMessage("El id debe ser un entero positivo").toInt(),
];

export const taskBodyValidators = [
  body("title").trim().notEmpty().withMessage("El título es obligatorio").bail().isLength({ min: 3, max: 100 }).withMessage("El título debe tener entre 3 y 100 caracteres"),
  body("course").trim().notEmpty().withMessage("El curso es obligatorio").bail().isLength({ min: 2, max: 80 }).withMessage("El curso debe tener entre 2 y 80 caracteres"),
  body("description").optional({ nullable: true }).trim().isLength({ max: 500 }).withMessage("La descripción no puede superar 500 caracteres"),
  body("due_date").notEmpty().withMessage("La fecha de entrega es obligatoria").bail().custom(isValidDate).withMessage("La fecha debe tener formato YYYY-MM-DD y ser válida"),
  body("priority").isIn(priorities).withMessage("La prioridad debe ser low, medium o high"),
  body("status").isIn(statuses).withMessage("El estado debe ser pending, in_progress o completed"),
];

export const taskQueryValidators = [
  query("search").optional().trim().isLength({ max: 100 }).withMessage("La búsqueda no puede superar 100 caracteres"),
  query("status").optional().isIn(statuses).withMessage("El filtro de estado no es válido"),
  query("priority").optional().isIn(priorities).withMessage("El filtro de prioridad no es válido"),
];

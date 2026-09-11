import { Router } from "express";
import { createTask, deleteTaskById, getTask, listTasks, updateTaskById } from "../controllers/taskController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { taskBodyValidators, taskIdValidator, taskQueryValidators } from "../validators/taskValidators.js";

const router = Router();

router.use(requireAuth);
router.get("/", taskQueryValidators, validateRequest, listTasks);
router.get("/:id", taskIdValidator, validateRequest, getTask);
router.post("/", taskBodyValidators, validateRequest, createTask);
router.put("/:id", taskIdValidator, taskBodyValidators, validateRequest, updateTaskById);
router.delete("/:id", taskIdValidator, validateRequest, deleteTaskById);

export default router;

import { Router } from "express";
import { login, me, register } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  loginValidators,
  registerValidators,
} from "../validators/authValidators.js";

const router = Router();

router.post("/register", registerValidators, validateRequest, register);
router.post("/login", loginValidators, validateRequest, login);
router.get("/me", requireAuth, me);

export default router;

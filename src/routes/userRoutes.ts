import { Router } from "express";
import { createUserController, loginController, logoutController } from "../controllers/userController";

const router = Router();

router.post("/register", createUserController);
router.post("/login", loginController);
router.post("/logout", logoutController);

export default router;

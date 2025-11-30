const { Router } = require("express");
const { createUserController, loginController, logoutController } = require("../controllers/userController");

const router = Router();

router.post("/register", createUserController);
router.post("/login", loginController);
router.post("/logout", logoutController);

module.exports = router;

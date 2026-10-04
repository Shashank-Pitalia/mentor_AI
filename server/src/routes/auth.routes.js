import express from "express";
import { register } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { getMe } from "../controllers/auth.controller.js";
import { googleLoginController } from "../controllers/auth.controller.js";


const router = express.Router();

// Register Route
router.post("/register", register);
// Login Route
router.post("/login", login);
// Get Current User Route
router.get("/me", protect, getMe);
// Google Login Route
router.post("/google-login", googleLoginController);

export default router;
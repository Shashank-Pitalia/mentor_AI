import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import{updateProfile , changePassword , deleteProfile} from "../controllers/user.controller.js";

const router = express.Router();

router.patch("/profile", protect, updateProfile);
router.patch("/change-password", protect, changePassword);
router.delete("/delete-profile", protect, deleteProfile);

export default router;
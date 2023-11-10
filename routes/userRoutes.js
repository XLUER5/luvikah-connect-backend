import express from "express";
import { getAllUsers, newUser, loginUser, getProfile, updateProfile } from "../controllers/UserController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", newUser);
router.post("/login", loginUser);
router.post("/getPerfil", getProfile)
router.post("/updatePerfil", updateProfile)

export default router;

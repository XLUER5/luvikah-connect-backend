import express from "express";
import { newComment } from "../controllers/ComentarioController.js";

const router = express.Router();

router.post("/", newComment);

export default router;

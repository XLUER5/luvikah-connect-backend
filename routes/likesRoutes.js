import express from "express";
import { newLike } from "../controllers/LikeController.js";

const router = express.Router();

router.post("/", newLike);

export default router;

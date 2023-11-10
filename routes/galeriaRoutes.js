import express from "express";
import multer from "multer";
import path from "path";

import { getGaleria, newPhoto } from "../controllers/GaleriaController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinantionPath = path.resolve(
      "/Users/luiscaestrada/NODEJS/luvikah-connect-backend/imagenes"
    );
    cb(null, destinantionPath);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.get("/", getGaleria);

router.post("/subirImagen", upload.single("imagen"), newPhoto);

export default router;

import express from "express";
import cors from "cors";
import db from "./db/db.js";

import userRoutes from "./routes/userRoutes.js";
import galeriaRoutes from "./routes/galeriaRoutes.js";
import comentarioRoutes from "./routes/comentarioRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

//rutaEstatica de imagenes
app.use("/imagenes", express.static("./imagenes"));

//Rutas del backend
app.use("/user", userRoutes);
app.use("/galeria", galeriaRoutes);
app.use("/comentario", comentarioRoutes);

try {
  await db.authenticate();
  console.log("DATABASE ACTIVE");
} catch (error) {
  console.log("DATABASE ERROR:" + error);
}

app.get("/", (req, res) => {
  res.send("Hola Mundo");
});

app.listen(8000, () => {
  console.log("Server Running on port 8000");
});

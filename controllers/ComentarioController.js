import ComentarioModel from "../models/ComentarioModal.js";

export const newComment = async (req, res) => {
  try {
    const { comentario, idUser, idGaleria, fechaComentario } = req.body;

    const nuevoComentario = await ComentarioModel.create({
      fechaComentario,
      idUser,
      idGaleria,
      comentario,
    });

    res.status(201).json({
      mensaje: "Comentario creado con éxito",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al crear el comentario", error: error.message });
  }
};

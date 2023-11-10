import LikeModel from "../models/LikeModel.js";

export const newLike = async (req, res) => {
  try {
    const { idGaleria, idUser } = req.body;

    // Buscar el registro existente o crear uno nuevo
    const [like, created] = await LikeModel.findOrCreate({
      where: { idGaleria, idUser },
      defaults: { voto: true }, // Puedes establecer el valor predeterminado según tus necesidades
    });

    // Si ya existe, cambiar el valor de 'voto' al booleano contrario
    if (!created) {
      like.voto = !like.voto;
      await like.save();
    }

    res
      .status(200)
      .json({ status: 200, message: "Voto registrado exitosamente." });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor." });
  }
};

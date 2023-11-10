import db from "../db/db.js";
import GaleriaModel from "../models/GaleriaModel.js";

export const getGaleria = async (req, res) => {
  try {
    const query = `
    SELECT 
    T1.id as idGaleria,
    T2.username, 
    DATE_FORMAT(T1.fechaCreacion, "%d/%m/%Y") AS fechaSubida, 
    T1.urlImagen, 
    T1.comentario,
    (SELECT COUNT(*) FROM votacion WHERE voto = 1 AND idGaleria = T1.id ) as likes
    FROM galeria T1
    LEFT JOIN users T2 ON T1.idUsuario = T2.id
      `;

    const galeriaResults = await db.query(query, {
      type: db.QueryTypes.SELECT,
    });

    const commentsQuery = `
            SELECT 
            idComment, 
            idGaleria, 
            T2.username as user, 
            comentario,
            "https://randomuser.me/api/portraits/lego/1.jpg" as commentImg, 
            DATE_FORMAT(T1.fechaComentario, "%d/%m/%Y") as fecha
            FROM comentario T1
            LEFT JOIN users T2 ON T1.idUser = T2.id
      `;

    const commentsResults = await db.query(commentsQuery, {
      type: db.QueryTypes.SELECT,
    });

    // Organizar los resultados en una estructura JSON
    const galeriasWithComments = [];

    galeriaResults.forEach((galeria) => {
      const commentsForGaleria = commentsResults.filter(
        (comment) => comment.idGaleria === galeria.idGaleria
      );
      galeriasWithComments.push({
        id: galeria.idGaleria,
        user: galeria.username,
        userImg: "https://randomuser.me/api/portraits/lego/1.jpg",
        fecha: galeria.fechaSubida,
        img: galeria.urlImagen,
        comentario: galeria.comentario,
        likes: galeria.likes,
        comentarios: commentsForGaleria,
      });
    });

    res.json(galeriasWithComments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGaleriaUser = async (req, res) => {

    const { idUsuario } = req.body;

    try {
      const query = `
      SELECT 
      T1.id as idGaleria,
      T2.username, 
      DATE_FORMAT(T1.fechaCreacion, "%d/%m/%Y") AS fechaSubida, 
      T1.urlImagen, 
      T1.comentario,
      (SELECT COUNT(*) FROM votacion WHERE voto = 1 AND idGaleria = T1.id ) as likes
      FROM galeria T1
      LEFT JOIN users T2 ON T1.idUsuario = T2.id WHERE T2.username = '${idUsuario}'
        `;
  
      const galeriaResults = await db.query(query, {
        type: db.QueryTypes.SELECT,
      });
  
      const commentsQuery = `
              SELECT 
              idComment, 
              idGaleria, 
              T2.username as user, 
              comentario,
              "https://randomuser.me/api/portraits/lego/1.jpg" as commentImg, 
              DATE_FORMAT(T1.fechaComentario, "%d/%m/%Y") as fecha
              FROM comentario T1
              LEFT JOIN users T2 ON T1.idUser = T2.id
        `;
  
      const commentsResults = await db.query(commentsQuery, {
        type: db.QueryTypes.SELECT,
      });
  
      // Organizar los resultados en una estructura JSON
      const galeriasWithComments = [];
  
      galeriaResults.forEach((galeria) => {
        const commentsForGaleria = commentsResults.filter(
          (comment) => comment.idGaleria === galeria.idGaleria
        );
        galeriasWithComments.push({
          id: galeria.idGaleria,
          user: galeria.username,
          userImg: "https://randomuser.me/api/portraits/lego/1.jpg",
          fecha: galeria.fechaSubida,
          img: galeria.urlImagen,
          comentario: galeria.comentario,
          likes: galeria.likes,
          comentarios: commentsForGaleria,
        });
      });
  
      res.json(galeriasWithComments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const newPhoto = async (req, res) => {
  try {
    const { comentario, idUsuario, fechaCreacion } = req.body;
    const urlImagen = req.file.filename; 

    const galeria = new GaleriaModel({
      comentario,
      idUsuario,
      urlImagen,
      fechaCreacion
    });

    await galeria.save(); 

    res
      .status(200)
      .json({ status: 200, message: "Imagen subida correctamente" });
  } catch (error) {
    console.error(
      "Error al subir imagen ",
      error
    );
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const newComment = async (req, res) => {
    const { comentario, idUsuario, idGaleria, fechaComentario } = req.body;
}

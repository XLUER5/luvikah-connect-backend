import { DataTypes } from "sequelize";
import db from "../db/db.js";

const ComentarioModel = db.define(
  "comentarioModal",
  {
    idComment: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    idGaleria: { type: DataTypes.INTEGER, allowNull: false },
    idUser: { type: DataTypes.INTEGER, allowNull: false },
    comentario: { type: DataTypes.STRING(256), allowNull: false },
    fechaComentario: { type: DataTypes.DATE, allowNull: false },
  },
  {
    timestamps: false,
    tableName: "comentario",
  }
);

export default ComentarioModel;
